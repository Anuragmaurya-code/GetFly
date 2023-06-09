const Sequelize = require("sequelize");
const sequelize = require("../dbconfig");
const Book = sequelize.define(
  "Book",
  {
    book_id: {
      type: Sequelize.DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    sub_title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    var_title: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    Author1: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    Author2: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    Author3: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    corp_author: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    volumn: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      default: 1,
    },
    editor: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    edition: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    publishers: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    place: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    year_of_publication: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    date_added: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    date_modified: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
    library: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    order_number: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    },
    quantity: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      default: 1,
    },
  },
  {
    freezeTableName: true,
    timeStamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

// Book.sync()
//   .then((data) => console.log("Book table Synced successfully!"))
//   .catch((err) => console.log("Book table syncing failed", err));

module.exports = Book;
