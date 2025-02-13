"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "cart",
      [
        {
          user_id: 1,
          product_id: 12,
          quantity: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 5,
          product_id: 18,
          quantity: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 3,
          product_id: 21,
          quantity: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 6,
          product_id: 20,
          quantity: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 9,
          product_id: 13,
          quantity: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 4,
          product_id: 16,
          quantity: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 10,
          product_id: 17,
          quantity: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          product_id: 21,
          quantity: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 7,
          product_id: 20,
          quantity: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 8,
          product_id: 19,
          quantity: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cart", null, {});
  },
};
