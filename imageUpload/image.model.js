


  const { DataTypes } = require('sequelize');

module.exports = uploadImageModel;

function uploadImageModel(sequelize) {
    const attributes = {
        type: { type: DataTypes.STRING, allowNull: true },
        name: { type: DataTypes.STRING, allowNull: true },
        data: { type: DataTypes.STRING, allowNull: true }
       
    };

    
    
    return sequelize.define('upload_image', attributes);
}

