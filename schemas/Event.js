module.exports = function (mongoose) {

    var eventSchema = mongoose.Schema({
        title: {type: String, required: true, index: {unique: true}},
        description: String,
        date: Date,
        codes: [
            {
                code: {type: mongoose.Schema.Types.ObjectId, ref: 'Code'}
            }
        ],
        createdAt: {type: Date, default: Date.now},
    });

    return mongoose.model('Event', eventSchema);

};
