module.exports = function (server, models) {
    var Event = models['Event'];
    var Player = models['Player'];

    //Required for NotFoundError when an Event object does not exist
    var restify = require('restify');
    var mongoose = require('mongoose');
    var util = require('../lib/utilities/objects');


    var eventPropertyFilter = "-codes -__v";

    /**
     * Retrieves all Event objects from database.
     * @param request
     * @param response
     * @param next
     */
    function getAllEvents(request, response, next) {
        Event.find({}, eventPropertyFilter, {sort: {'date': -1}}, function (err, results) {
            if (err) return console.error(err);
            response.send({events: results});
            next();
        });
    }

    /**
     * Retrieves an Event object from the database based on supplied _id.
     * @param request
     * @param response
     * @param next
     */
    function getEventById(request, response, next) {
        Event.findOne({"_id": request.params.id}, eventPropertyFilter, function (err, event) {
            response.send({event: event});
            next();
        });
    }

    function getEventCodes(request, response, next) {
        Event.findOne({"_id": request.params.id}, function (err, event) {
            response.send({codes: event.codes});
            next();
        });
    }

    /**
     * Updates an Event object based on supplied _id.
     * If _id doesn't exist a NotFoundError is returned.
     * @param request
     * @param response
     * @param next
     */
    function updateEvent(request, response, next) {
        Event.findOne({_id: request.body._id}, eventPropertyFilter, function (err, event) {
            if (err) return next(new restify.NotFoundError("Unknown event"));
            util.mergeObjects(event, request.body);
            event.save(function (err) {
                if (err) throw err;
                response.send({event: event});
                next();
            });
        });
    }

    /**
     * Creates a new Event object and saves it to the database.
     * @param request
     * @param response
     * @param next
     */
    function createEvent(request, response, next) {
        var newEvent = Event({title: request.body.title, description: request.body.description});

        util.mergeObjects(newEvent, request.body);

        newEvent.save(function (err) {
            if (err) throw err;
            response.send({event: newEvent});
            next();
        });
    }

    /**
     * Upserts a new Event object with the database
     * @param request
     * @param response
     * @param next
     */
    function upsertEvent(request, response, next) {
        if (request.body._id !== null && request.body._id != undefined) {
            updateEvent(request, response, next);
        } else {
            createEvent(request, response, next);
        }
    }

    /**
     * Relates a Code object to an Event object in the database.
     * @param request
     * @param response
     * @param next
     */
    function addCodeToEvent(request, response, next) {
        Event.findOne({"_id": request.params.eventId}, function (err, event) {
            if (err) throw err;
            event.codes.push(request.params.codeId);
            event.save(function (err) {
                if (err) throw err;
                response.send();
                next();
            });
        });
    }

    /**
     * Deletes an Event object from the database with the given _id.
     * @param request
     * @param response
     * @param next
     */
    function deleteEvent(request, response, next) {
        Event.findOneAndRemove({_id: request.body._id}, function (err) {
            if (err) throw err;
            response.send();
            next();
        });
    }

    /**
     * Removes a Code object from an Event object in the database.
     * @param request
     * @param response
     * @param next
     */
    function removeCodeFromEvent(request, response, next) {
        Event.findOne({_id: request.params.eventId}, function (err, event) {
            if (err) throw err;

            var index = -1;
            //ToDo: This may introduce performance degradation if a large amount of codes exist.
            for (var i = 0; i < event.codes.length; i++) {
                //Note: don't compare types here. Just value
                if (event.codes[i]._id == request.params.codeId) {
                    index = i;
                    break;
                }
            }

            if (index > -1) {
                event.codes.splice(index, 1);
                event.save(function (err) {
                    if (err) throw err;
                    response.send();
                    next();
                });
            } else {
                response.send();
                next();
            }
        });
    }

    function getPlayerLeaderboardForEvent(request, response, next) {

        Player.aggregate([
                {"$unwind": "$scans"},
                {$match: {"scans.event": mongoose.Types.ObjectId(request.params.id)}},
                {$sort: {"scans.scannedAt": -1}},
                {
                    $group: {
                        _id: {code: "$scans.code", event: "$scans.event", player: "$_id"},
                        scan: {$first: "$scans"},
                        alias: {$first: "$alias"},
                        playerId: {$first: "$_id"}
                    }
                },
                {$sort: {"scan.scannedAt": -1}},
                {
                    $group: {
                        _id: "$_id.player",
                        eventId: {$first: "$_id.event"},
                        scans: {$push: "$scan"},
                        alias: {$first: "$alias"},
                        startTime: {$last: "$scan.scannedAt"},
                        endTime: {$first: "$scan.scannedAt"}

                    }
                },
                {
                    $project: {
                        numberOfScans: {$size: "$scans"},
                        alias: "$alias",
                        eventId: "$eventId",
                        duration: {$subtract: ["$endTime", "$startTime"]},
                        startTime: "$startTime",
                        endTime: "$endTime"
                    }
                },
                {$sort: {"numberOfScans": -1, "duration": -1}}

            ],
            function (err, res) {
                if (err) response.send(new restify.ImATeapotError("More Caffiene Needed..."));
                response.send({players: res});
                next();
            });

    }

    server.get('/events', getAllEvents);

    server.get('/events/:id', getEventById);
    server.get('/events/:id/codes', getEventCodes);

    server.put('/events', upsertEvent);
    server.put('/events/:eventId/:codeId', addCodeToEvent);
    server.del('/events', deleteEvent);
    server.del('/events/:eventId/:codeId', removeCodeFromEvent);
    server.get('/events/:id/leaderboard', getPlayerLeaderboardForEvent);

};