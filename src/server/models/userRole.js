const { sequelize } = require('./sequelize/db');

class UserRole{
    constructor(props){
        this.props = props;

        this.findAll = this.findAll.bind(this);
    }

    findAll(){
        let where = "";
        let params = new Array();

        if (this.props.hasOwnProperty('userIds')) {
            params.push("userId IN (:userIds)");
        }

        if (this.props.hasOwnProperty('roleIds')) {
            params.push("roleId IN (:roleIds)");
        }

        if (params.length > 0) {
            where = "where ";

            where += params.reduce((accumulator, param) => accumulator + " AND " + param);
        }

        return sequelize.query("SELECT * FROM userrole " + where,{
            replacements: this.props,
            type: sequelize.QueryTypes.SELECT
        });
    }
}

module.exports = UserRole;