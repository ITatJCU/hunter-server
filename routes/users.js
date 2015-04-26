module.exports = function (server, models) {
    var Player = models["Player"];

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



    function putUserResponse(request, response, next) {
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