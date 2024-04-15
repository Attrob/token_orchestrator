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
  
  