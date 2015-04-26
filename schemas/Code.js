module.exports = function (mongoose) {

    var codeSchema = mongoose.Schema({
        title: {type: String, required: true, index: {unique: true}},
        description: String,
        weight: {type: Number, default: 1},
        createdAt: {type: Date, default: Date.now},
        location: {
            latitude: Number,
            longitude: Number
        }
    });

    return mongoose.model('Code', codeSchema);

};
