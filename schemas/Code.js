module.exports = function (mongoose) {

    var codeSchema = mongoose.Schema({
        title: {type: String, required: true, index: { unique: true }},
        description: String
    });

    return mongoose.model('Code', codeSchema);

};
