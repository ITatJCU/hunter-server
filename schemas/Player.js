module.exports = function (mongoose) {

    ///User Schema
    var playerSchema = mongoose.Schema({
        alias: {type: String, required: true, index: { unique: true }},
        createdAt: {type: Date, default: Date.now },
        scans:[
            {
                event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
                code: {type: mongoose.Schema.Types.ObjectId, ref: 'Code'},
                scannedAt: {type: Date, default: Date.now}
            }
        ]
    });

    return mongoose.model('Player', playerSchema);

};
