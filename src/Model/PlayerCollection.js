/**
 * Created by daniel on 10/08/16.
 */

export default class PlayerCollection {
    /**
     */
    constructor(initializationValues) {
        /**
         * Initialize the instance with the keys and values from the given object
         *
         * @param initializationValues
         * @returns {IrLib.Dictionary}
         * @private
         */
        var _initWithObject = function (initializationValues) {
            var keys = Object.keys(initializationValues),
                keysLength = keys.length,
                currentKey;
            for (var i = 0; i < keysLength; i++) {
                currentKey = keys[i];
                this[currentKey] = initializationValues[currentKey];
            }
        };

        if (arguments.length > 0) {
            if (typeof initializationValues !== 'object') {
                throw new TypeError(
                    'Initialization argument has to be of type object, ' + (typeof initializationValues) + ' given',
                    1435219260
                );
            }
            if (initializationValues === null) {
                initializationValues = {};
            }
            _initWithObject.call(this, initializationValues);
        }

        return this;
    }

    /**
     * Returns the dictionary's values as array
     *
     * @returns {Array}
     */
    values() {
        var valueCollection = [],
            keys = this.keys(),
            keysLength = keys.length;
        for (var i = 0; i < keysLength; i++) {
            valueCollection.push(this[keys[i]]);
        }
        return valueCollection;
    }

    /**
     * Returns the dictionary's keys as array
     *
     * @returns {Array}
     */
    keys() {
        return Object.keys(this);
    }

    /**
     * Invokes the callback for each key value pair in the Dictionary, passing in the value, key and dictionary
     *
     * Callback schema: function(value, key, dictionary) {}
     *
     * @param {Function} callback
     * @param {Object} [thisArg]
     */
    forEach(callback, thisArg) {
        this.map(callback, thisArg);
    }

    /**
     * Creates a new array with the results of invoking the given callback for each key value pair in the Dictionary.
     *
     * Callback schema: function(value, key, dictionary) { return newValue; }
     *
     * @param {Function} callback
     * @param {Object} [thisArg]
     */
    map(callback, thisArg) {
        if (typeof callback !== 'function') {
            throw new TypeError('Argument "callback" is not of type function');
        }
        var valueCollection = [],
            keys = this.keys(),
            keysLength = keys.length,
            preparedCallback = callback,
            currentKey, currentValue;

        if (thisArg) {
            preparedCallback = callback.bind(thisArg);
        }

        for (var i = 0; i < keysLength; i++) {
            currentKey = keys[i];
            currentValue = this[currentKey];
            valueCollection.push(preparedCallback(currentValue, currentKey, this));
        }
        return valueCollection;
    }

    reduce(callback, initialValue) {
        if (typeof callback !== 'function') {
            throw new TypeError('Argument "callback" is not of type function');
        }

        return this.values().reduce(callback, initialValue);
    }

    get length() {
        return this.keys().length;
    }
}