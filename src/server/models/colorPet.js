const { sequelize } = require('./sequelize/db');

class ColorPet{
    constructor(props){
        this.props = props;

        this.findAll = this.findAll.bind(this);
    }

    findAll(){
        let where = "";
        let params = new Array();

        if (this.props.hasOwnProperty('colorIds')) {
            params.push("colorId IN (:colorIds)");
        }

        if (this.props.hasOwnProperty('petIds')) {
            params.push("petId IN (:petIds)");
        }

        if (params.length > 0) {
            where = "where ";

            where += params.reduce((accumulator, param) => accumulator + " AND " + param);
        }

        return sequelize.query("SELECT * FROM colorpet " + where,{
            replacements: this.props,
            type: sequelize.QueryTypes.SELECT
        });
    }
}

module.exports = ColorPet;