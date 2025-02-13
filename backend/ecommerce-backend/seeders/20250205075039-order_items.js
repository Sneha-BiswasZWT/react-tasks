"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "order_items",
      [
        {
          order_id: 1,
          product_id: 15,
          quantity: 2,
          price: 50.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          order_id: 1,
          product_id: 20,
          quantity: 1,
          price: 100.0,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Order Items for Order 2 (User 1)
        {
          order_id: 2,
          product_id: 17,
          quantity: 1,
          price: 60.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          order_id: 2,
          product_id: 21,
          quantity: 2,
          price: 42.75,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Order Items for Order 3 (User 2)
        {
          order_id: 3,
          product_id: 13,
          quantity: 1,
          price: 100.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          order_id: 3,
          product_id: 18,
          quantity: 1,
          price: 50.5,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Order Items for Order 4 (User 2)
        {
          order_id: 4,
          product_id: 22,
          quantity: 1,
          price: 70.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          order_id: 4,
          product_id: 16,
          quantity: 2,
          price: 40.0,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Order Items for Order 5 (User 3)
        {
          order_id: 5,
          product_id: 19,
          quantity: 1,
          price: 120.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          order_id: 5,
          product_id: 14,
          quantity: 1,
          price: 100.0,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Order Items for Order 6 (User 3)
        {
          order_id: 6,
          product_id: 21,
          quantity: 3,
          price: 30.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          order_id: 6,
          product_id: 20,
          quantity: 1,
          price: 70.0,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Order Items for Order 7 (User 4)
        {
          order_id: 7,
          product_id: 15,
          quantity: 2,
          price: 50.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          order_id: 7,
          product_id: 21,
          quantity: 1,
          price: 80.0,
          created_at: new Date(),
          updated_at: new Date(),
        },

        // Order Items for Order 8 (User 5)
        {
          order_id: 8,
          product_id: 13,
          quantity: 1,
          price: 75.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          order_id: 8,
          product_id: 17,
          quantity: 2,
          price: 55.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("order_items", null, {});
  },
};
