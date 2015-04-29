var CompositeRecorder = require('../../lib/utilities/composite-recorder');
var Recorder = require('../../lib/utilities/recorder');

var cr = new CompositeRecorder();

exports['testConstructor'] = function (test) {
    test.strictEqual(cr.size(), 0);
    test.done();
};

exports['testAddNonRecorder'] = function (test) {
    cr.add({});
    test.strictEqual(cr.size(), 0);
    cr.add(null);
    test.strictEqual(cr.size(), 0);
    cr.add("");
    test.strictEqual(cr.size(), 0);
    test.done();
};

exports['testAddRecorder'] = function (test) {
    cr.add(new Recorder());
    test.strictEqual(cr.size(), 1);
    cr.add(new Recorder());
    cr.add(new Recorder());
    test.strictEqual(cr.size(), 3);
    test.done();
};

exports['testRemoveRecorder'] = function (test) {
    var r = new Recorder();
    cr.add(r);
    test.strictEqual(cr.size(), 4);
    cr.remove(r);
    test.strictEqual(cr.size(), 3);
    test.done();
};

exports['testRemoveNonRecorder'] = function (test) {
    cr.remove({});
    test.strictEqual(cr.size(), 3);
    cr.remove(null);
    test.strictEqual(cr.size(), 3);
    cr.remove("");
    test.strictEqual(cr.size(), 3);
    test.done();
};

exports['testClear'] = function (test) {
    cr.clear();
    test.strictEqual(cr.size(), 0);
    test.done();
};
