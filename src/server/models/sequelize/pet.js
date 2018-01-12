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
        currentSize: {
            type: DataTypes.DOUBLE
        },
        potentialSize: {
            type: DataTypes.DOUBLE
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
        Pets.belongsTo(models.status, {
            as: 'status',
            foreignKey: "statusId"
        });
        Pets.belongsTo(models.ear, {
            as: 'ear',
            foreignKey: "earId"
        });
        Pets.belongsTo(models.tail, {
            as: 'tail',
            foreignKey: "tailId"
        });
        Pets.belongsTo(models.frequency, {
            as: 'exercise',
            foreignKey: "exerciseId"
        });
        Pets.belongsTo(models.frequency, {
            as: 'grooming',
            foreignKey: "groomingId"
        });
        Pets.belongsTo(models.frequency, {
            as: 'shedding',
            foreignKey: "sheddingId"
        });

        Pets.belongsToMany(models.color, {through: 'ColorPet'});
        //TODO: add experience and reaction association
    }
  
    return Pets;
};