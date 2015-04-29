/**
 * Merges multiple objects together
 * @param {array} objects to merge of object to check
 * @returns {object}
 */
module.exports.merge = function (objects) {
    var merged = {};
    for (var i = 0; i < objects.length; i++) {
        for (var prop in objects[i]) {
            merged[prop] = objects[i][prop];
        }
    }
    return merged;
};


/**
 * Tests Inheritance of an object to a class reference.
 * @param {object} object to check
 * @param {class} classReference to validate against
 * @returns {boolean}
 */
module.exports.IsPrototypeOf = function (object, classReference) {
    return classReference.prototype.isPrototypeOf(object);
};