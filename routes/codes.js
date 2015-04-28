module.exports = function (server, models) {
    var Code = models['Code'];
    //Required for NotFoundError when a code does not exist
    var restify = require('restify');

    function getAllCodes(request, response, next) {
        Code.find({}, function (err, codes) {
            if (err) return console.error(err);
            response.send(codes);
            next();
        });
    }

    function getCodeById(request, response, next) {
        Code.find({"_id": request.params.id}, function (err, code) {
            response.send(code);
            next();
        });
    }

    function updateCode(request, response, next) {
        Code.findOne({_id: request.body._id}, function (err, code) {
            if (err) return next(new restify.NotFoundError("Unknown code"));
            code.title = request.body.title;
            code.description = request.body.description;
            code.location = {latitude: request.body.latitude, longitude: request.body.longitude};
            code.save(function (err) {
                if (err) throw err;
                response.send(code);
                next();
            });
        });
    }

    /**
     * Creates and persists a new code object with the database
     * @param request
     * @param response
     * @param next
     */
    function createCode(request, response, next) {
        var newCode = Code({title: request.body.title, description: request.body.description});
        newCode.save(function (err) {
            if (err) throw err;
            response.send(newCode);
            next();
        });
    }

    /**
     * Upserts a new code object with the database
     * @param request
     * @param response
     * @param next
     */
    function upsertCode(request, response, next) {
        if (request.body._id !== null && request.body._id != undefined) {
            updateCode(request, response, next);
        } else {
            createCode(request, response, next);
        }
    }

    function deleteCode(request, response, next) {
        Code.findOneAndRemove({_id: request.body._id}, function (err) {
            if (err) throw err;
            response.send();
            next();
        });
    }

    server.get('/codes', getAllCodes);
    server.get('/codes/:id', getCodeById);
    server.put('/codes', upsertCode);
    server.del('/codes', deleteCode);
};