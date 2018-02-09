const { Link } = require('react-router-dom');

class Helper {
    constructor() {
        this.isEmpty = this.isEmpty.bind(this);
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

    pluralizeWord(word) {
        let plural = new Object(word);
        plural += word.endsWith("s") ? "es" : "s";

        return plural;
    }

    capitalizeWord(word) {
        const capital = word.charAt(0).toUpperCase() + word.slice(1);
        
        return capital;
    }
}

module.exports = new Helper();