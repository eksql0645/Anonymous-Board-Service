const Sequelize = require("sequelize");

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(25),
          allowNull: false,
          unique: false,
        },
        content: {
          type: Sequelize.STRING(210),
          allowNull: false,
          unique: false,
        },
        name: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: false,
        },
        password: {
          type: Sequelize.STRING(80),
          allowNull: false,
          unique: false,
        },
        weather: {
          type: Sequelize.STRING(50),
          allowNull: false,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Board",
        tableName: "boards",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate() {}
};
