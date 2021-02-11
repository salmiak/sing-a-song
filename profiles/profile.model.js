const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        description: { type: DataTypes.STRING },
        created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated: { type: DataTypes.DATE },
        // user: { type: } // Relation to the user
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        //timestamps: false,
    };

    return sequelize.define('profile', attributes, options);
}
