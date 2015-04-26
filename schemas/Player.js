module.exports = function (mongoose) {

    ///User Schema
    var playerSchema = mongoose.Schema({
        alias: String
    });

    return mongoose.model('Player', playerSchema);

};
