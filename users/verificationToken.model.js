const { DataTypes } = require('sequelize');

module.exports = Verification;

function Verification(sequelize) {
    const attributes = {
        userId: { type: DataTypes.STRING, allowNull: true },
        token: { type: DataTypes.STRING, allowNull: true }
        
       
    };
 
    return sequelize.define('VerificationToken', attributes, {
        classMethods: {
            associate: function(models) {
                verificationtoken.belongsTo(models.User, {
                    as: "user",
                    foreignKey: "userId",
                    foreignKeyConstraint: true
                });
            }
        }
    });
    };