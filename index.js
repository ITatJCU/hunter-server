var restify = require('restify');

var server = restify.createServer();

function getAllUsersResponse(request, response, next) {
    //Hard-coded as proof of concept only
    response.send(
        {
            "users": [
                {
                    "id": 1,
                    "username": "Lachlan",
                    "alias": "lachlan.robertson"
                },
                {
                    "id": 2,
                    "username": "John",
                    "alias": "john.hardy"
                },
                {
                    "id": 3,
                    "username": "Peter",
                    "alias": "peter.thompson"
                }
            ]
        }
    );
    next();
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


//Start the server
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});