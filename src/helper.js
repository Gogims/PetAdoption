import { Link } from 'react-router-dom';

class Helper{
    constructor(){
        this.isEmpty = this.isEmpty.bind(this);
    }

    isEmpty(obj){
        if (Array.isArray(obj)) {
            return obj.length === 0;
        }

        return obj === undefined || obj === null || obj === '';
    }

    createDropDown(name, path, subMenu){
        return {
            key: name,
            as: Link,
            text: name,
            to: path
        };
    }
}

module.exports = new Helper();