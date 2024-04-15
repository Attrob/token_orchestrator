/*  
    CREATE TABLE tokens (
        id int(11) NOT NULL AUTO_INCREMENT,
        token_key varchar(255) UNIQUE NOT NULL,
        in_use tinyint(1) NOT NULL DEFAULT 0,
        is_active tinyint(1) NOT NULL DEFAULT 1,
        expiry_at datetime NOT NULL,
        created_at datetime NOT NULL DEFAULT NOW(),
        updated_at datetime NOT NULL DEFAULT NOW(),
    )
*/
module.exports = function (sequelize, DataTypes) {
    const tokens = sequelize.define(
      "tokens",
      {
        id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        token_key: {
          type: DataTypes.STRING(255),
          unique: true,
          allowNull: false,
        },
        in_use: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            allowNull: false
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          defaultValue: 1,
          allowNull: false
        },
        expiry_at: {
          type: DataTypes.DATE,
          allowNull: false 
        },
        created_at: {
          type: DataTypes.DATE,
          defaultValue: new Date(),
          allowNull: false
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: new Date(),
          allowNull: false
        }
      },
      {
        tableName: "tokens",
        timestamps: true,
        underscored: true,
      }
    );
  
    return tokens;
  };
  
  