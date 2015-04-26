module.exports = function (mongoose) {

    var codeSchema = mongoose.Schema({
        title: {type: String, required: true, index: {unique: true}},
        description: String,
        weight: Number,
        location: {
            latitude: Number,
            longitude: Number
        }
    });

    return mongoose.model('Code', codeSchema);

};
