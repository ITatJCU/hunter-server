module.exports = function (server, models) {
    var Event = models['Event'];
    //Required for NotFoundError when a code does not exist
    var restify = require('restify');

    function getAllEvents(request, response, next) {
        Event.find({}, function (err, event) {
            if (err) return console.error(err);
            response.send(event);
            next();
        });
    }

    function getEventById(request, response, next) {
        Event.find({"_id": request.params.id}, function (err, event) {
            response.send(event);
            next();
        });
    }

    function updateEvent(request, response, next) {
        Event.findOne({_id: request.body._id}, function (err, event) {
            if (err) return next(new restify.NotFoundError("Unknown event"));
            event.title = request.body.title;
            event.description = request.body.description;
            if (request.body.date != null && request.body.date != undefined) {
                event.date = request.body.date;
            }
            event.save(function (err) {
                if (err) throw err;
                response.send(event);
                next();
            });
        });
    }

    function createEvent(request, response, next) {
        var newEvent = Event({title: request.body.title, description: request.body.description});
        if (request.body.date != null && request.body.date != undefined) {
            newEvent.date = request.body.date;
        }
        newEvent.save(function (err) {
            if (err) throw err;
            response.send(newEvent);
            next();
        });
    }

    function upsertEvent(request, response, next) {
        if (request.body._id !== null && request.body._id != undefined) {
            updateEvent(request, response, next);
        } else {
            createEvent(request, response, next);
        }
    }

    function putEventAddCodeResponse(request, response, next) {
        Event.findOne({"_id": request.params.eventId}, function (err, event) {
            if (err) throw err;
            event.codes.push(request.params.codeId);
            event.save(function (err) {
                if (err) throw err;
                response.send(event);
                next();
            });
        });
    }

    function delEventResponse(request, response, next) {
        Event.findOneAndRemove({_id: request.body._id}, function (err) {
            if (err) throw err;
            response.send();
            next();
        });
    }

    server.get('/events', getAllEvents);
    server.get('/events/:id', getEventById);
    server.put('/events', upsertEvent);
    server.put('/events/:eventId/:codeId', putEventAddCodeResponse);
    server.del('/events', delEventResponse);
};