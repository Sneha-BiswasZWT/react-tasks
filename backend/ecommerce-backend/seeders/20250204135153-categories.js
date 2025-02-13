"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Tech Gadgets",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Outdoor Adventures",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Fashion Trends",
          created_at: new Date(),
          updated_at: new Date(),
        },
        { name: "Home Decor", created_at: new Date(), updated_at: new Date() },
        {
          name: "Fitness & Health",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Foodie Delights",
          created_at: new Date(),
          updated_at: new Date(),
        },
        { name: "Gaming Gear", created_at: new Date(), updated_at: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
