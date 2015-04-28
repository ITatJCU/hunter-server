module.exports = function (server, models) {
    var Code = models['Code'];
    //Required for NotFoundError when a code does not exist
    var restify = require('restify');

    function getAllCodesResponse(request, response, next) {
        Code.find({}, function (err, codes) {
            if (err) return console.error(err);
            response.send(codes);
            next();
        });
    }

    function getCodeResponse(request, response, next) {
        Code.find({"_id": request.params.id}, function (err, code) {
            response.send(code);
            next();
        });
    }

    function putCodeResponse(request, response, next) {
        if (request.body._id !== null && request.body._id != undefined) {
            Code.findOne({_id: request.body._id}, function (err, code) {
                if (err) return next(new restify.NotFoundError("Unknown code"));
                code.title = request.body.title;
                code.description = request.body.description;
                code.weight = request.body.weight;
                code.location = {latitude: request.body.latitude, longitude: request.body.longitude};
                code.save(function (err) {
                    if (err) throw err;
                    response.send(code);
                    next();
                });
            });
        } else {
            var newCode = Code({title: request.body.title, description: request.body.description});
            newCode.save(function (err) {
                if (err) throw err;
                response.send(newCode);
                next();
            });
        }
    }

    function delCodeResponse(request, response, next) {
        Code.findOneAndRemove({_id: request.body._id}, function (err) {
            if (err) throw err;
            response.send();
            next();
        });
    }

    server.get('/codes', getAllCodesResponse);
    server.get('/codes/:id', getCodeResponse);
    server.put('/codes', putCodeResponse);
    server.del('/codes', delCodeResponse);
};