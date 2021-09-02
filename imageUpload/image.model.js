// module.exports = (sequelize, DataTypes) => {
//     const Image = sequelize.define("image", {
//       type: {
//         type: DataTypes.STRING,
//       },
//       name: {
//         type: DataTypes.STRING,
//       },
//       data: {
//         type: DataTypes.BLOB("long"),
//       },
//     });
  
//     return Image;
//   };


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

