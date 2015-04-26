module.exports = function (mongoose) {

    ///User Schema
    var playerSchema = mongoose.Schema({
        alias: {type: String, required: true, index: { unique: true }}
    });

    return mongoose.model('Player', playerSchema);

};
