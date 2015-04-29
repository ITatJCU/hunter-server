var Util = require("util");
var EventEmitter = process.EventEmitter;
var _instance;

function LogEventDispatcher() {
    EventEmitter.call(this);
}

Util.inherits(LogEventDispatcher, EventEmitter);

module.exports = {
    getInstance: function () {
        return _instance || (_instance = new LogEventDispatcher());
    },
    log: function (message) {
        this.getInstance().emit('log', message);
    }
};