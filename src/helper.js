const { error } = require('util');
const { Link } = require('react-router-dom');

class Helper {
    constructor() {
        this.isEmpty = this.isEmpty.bind(this);
        this.binarySearch = this.binarySearch.bind(this);
    }

    isEmpty(obj) {
        if (Array.isArray(obj)) {
            return obj.length === 0;
        }

        return obj === undefined || obj === null || obj === '';
    }

    createDropDownItem(name, path, subMenu) {
        return {
            key: name,
            as: Link,
            text: name,
            to: path
        };
    }

    pluralize(word) {
        let plural = "";
        const lastLetter = word.slice(-1);

        switch (lastLetter) {
            case "s":
                plural = word.slice(0) + "es";
                break;

            case "y":
                plural = word.slice(0, -1) + "ies";
                break;
        
            default:
                plural = word.slice(0) + "s";
                break;
        }

        return plural;
    }

    singularize(word) {
        let singular = "";

        if (word.endsWith("es")) {
            singular = word.slice(0, -2);
        }
        else if (word.endsWith("ies")) {
            singular = word.slice(0, -3) + "y";
        }
        else {
            singular = word.slice(-1);
        }

        return singular;
    }

    capitalizeWord(word) {
        const capital = word.charAt(0).toUpperCase() + word.slice(1);
        
        return capital;
    }

    binarySearch(array, value, prop) {
        const length = array.length;
        const middle = Math.floor(length / 2);
        const middleElement = this.isEmpty(prop) ? array[middle] : array[middle][prop];

        if (length === 1) {
            const arrayValue = this.isEmpty(prop) ? array[0] : array[0][prop];
            
            if (arrayValue === value) {
                return array[0];
            } else {
                throw error("The value does not exist in this array");
            }
        }

        if (middleElement > value) {
            const leftSide = array.slice(0, middle);
            return this.binarySearch(leftSide, value, prop);
        } else if (middleElement < value) {
            const rightSide = array.slice(middle, length);
            return this.binarySearch(rightSide, value, prop);
        }
        else {
            return array[middle];
        }
    }
}

module.exports = new Helper();