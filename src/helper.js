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
}

module.exports = new Helper();