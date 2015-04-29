module.exports = function (server, models) {
    var Code = models['Code'];
    var Event = models['Event'];
    var Player = models['Player'];

    var restify = require('restify');

    /**
     * Add a new scan for a player
     * @param request
     * @param response
     * @param next
     */
    function addPlayerScan(request, response, next){
        //Todo
    }

    server.get('/scan/:eventId/:codeId', addPlayerScan);

};