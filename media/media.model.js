const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        type: { type: DataTypes.STRING },
        value: { type: DataTypes.STRING },
        url: { type: DataTypes.STRING },
        provider: { type: DataTypes.STRING },
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        //timestamps: false,
    };

    return sequelize.define('media', attributes, options);
}
