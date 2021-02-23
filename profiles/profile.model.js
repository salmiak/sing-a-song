const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        stageName: { type: DataTypes.STRING },
        description: { type: DataTypes.TEXT },
        contactDetails: { type: DataTypes.TEXT },
        geoReach: { type: DataTypes.JSON },
        avatarURL: { type: DataTypes.STRING },
        coverURL: { type: DataTypes.STRING }
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        //timestamps: false,
    };

    return sequelize.define('profile', attributes, options);
}
