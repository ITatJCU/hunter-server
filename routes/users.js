module.exports = function (server, mongoose, db) {

    ///User Schema
    var playerSchema = mongoose.Schema({
        alias: String
    });

    var Player = mongoose.model('Player', playerSchema);

    ///Mongoose Model

    ///REST End-Points

    function getAllUsersResponse(request, response, next) {

        Player.find(function (err, players) {
            if (err) return console.error(err);
            response.send(players);
            next();
        });

    }

    function getUserResponse(request, response, next) {
        //Hard-coded as proof of concept only
        response.send(
            {
                "id": 1,
                "username": "Lachlan",
                "alias": "lachlan.robertson"
            }
        );
        next();
    }

    function putUserResponse(request, response) {
        //Hard-coded as proof of concept only
        console.log("Putting?");
        response.send(
            {
                "id": 1,
                "username": "Lachlan",
                "alias": "lachlan.robertson.updated"
            }
        );
        next();
    }

    server.get('/users', getAllUsersResponse);
    server.get('/user/:id', getUserResponse);
    server.put('/update/:id', putUserResponse);

};