const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        email:{type: DataTypes.STRING, allowNull: false },
        username: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false },

        isVerified: {type: DataTypes.STRING},
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };
    
    return sequelize.define('user', attributes, options, {
        classMethods: {
          associate: function(models) {
           User.hasOne(models.VerificationToken, {
                as: 'verificationtoken',
                foreignKey: 'userId',
                foreignKeyConstraint: true,
              });
          }
        }
      });
}
