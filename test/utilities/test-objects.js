var Objects = require('../../lib/utilities/objects');

exports['testMergeObjects'] = function (test) {
    //hmm...
    test.done();
};

exports['testIsPrototypeOf'] = function (test) {
    function Person() {
    }

    function NotPerson() {
    }

    Person.prototype.sayHello = function () {
        alert('hello');
    };

    function Student() {
        Person.call(this);
    }

    Student.prototype = new Person();
    Student.prototype.constructor = Student;
    Student.prototype.sayHello = function () {
    };

    var s = new Student();

    test.ok(Objects.IsPrototypeOf(s, Person));
    test.ok(!Objects.IsPrototypeOf(s, NotPerson));

    test.done();
};