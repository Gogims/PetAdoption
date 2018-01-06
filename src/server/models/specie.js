const sequelize = require('./sequelize/specie');

class Specie{
    constructor(specie, id) {
        this.id = id;
        this.specie = specie;
        
        this.create = this.create.bind(this);
    }
    
    create(){
        if (this.specie === undefined && this.specie === null) {
            throw error("Specie name is a required field");
        }

        const local = {
            specie: this.specie
        };

        return sequelize.create(local)
                            .then(newSpecie => newSpecie)
                            .catch(err => {throw err;})
    }
}

module.exports = Specie;