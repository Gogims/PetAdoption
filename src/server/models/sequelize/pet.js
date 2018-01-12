module.exports = (sequelize, DataTypes) => {
    const Pets = sequelize.define('pet', {
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        birthDay: {
            type: DataTypes.DATEONLY
        },
        birthEstimate: {
            type: DataTypes.BOOLEAN
        },
        statusId: {
            type: DataTypes.INTEGER
        },
        currentSize: {
            type: DataTypes.INTEGER
        },
        potentialSize: {
            type: DataTypes.INTEGER
        },
        fenceRequired: {
            type: DataTypes.BOOLEAN
        },
        houseTrained: {
            type: DataTypes.BOOLEAN
        },
        isObedient: {
            type: DataTypes.BOOLEAN
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender:{
            type: DataTypes.STRING(1),
            allowNull: false
        },
        hasSpecialNeeds: {
            type: DataTypes.BOOLEAN
        },
        specialNeeds: {
            type: DataTypes.STRING
        },
        aditionalDescription: {
            type: DataTypes.STRING
        }
    });

    Pets.associate = models => {
        Pets.belongsToMany(models.breed, {through: 'BreedPet'});
    }
  
    return Pets;
};