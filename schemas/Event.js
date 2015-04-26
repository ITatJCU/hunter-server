module.exports = function (mongoose) {

    var eventSchema = mongoose.Schema({
        title: {type: String, required: true, index: {unique: true}},
        description: String,
        date: Date
    });

    return mongoose.model('Event', eventSchema);

};
