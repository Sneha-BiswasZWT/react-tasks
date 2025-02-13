"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "wishlists",
      [
        {
          user_id: 1,
          product_id: 15,
          created_at: new Date(),
        },
        {
          user_id: 1,
          product_id: 20,
          created_at: new Date(),
        },

        // Wishlist items for User 2
        {
          user_id: 2,
          product_id: 18,
          created_at: new Date(),
        },
        {
          user_id: 2,
          product_id: 15,
          created_at: new Date(),
        },

        // Wishlist items for User 3
        {
          user_id: 3,
          product_id: 13,
          created_at: new Date(),
        },
        {
          user_id: 3,
          product_id: 21,
          created_at: new Date(),
        },

        // Wishlist items for User 4
        {
          user_id: 4,
          product_id: 16,
          created_at: new Date(),
        },
        {
          user_id: 4,
          product_id: 21,
          created_at: new Date(),
        },

        // Wishlist items for User 5
        {
          user_id: 5,
          product_id: 20,
          created_at: new Date(),
        },
        {
          user_id: 5,
          product_id: 19,
          created_at: new Date(),
        },

        // Wishlist items for User 6
        {
          user_id: 6,
          product_id: 12,
          created_at: new Date(),
        },
        {
          user_id: 6,
          product_id: 19,
          created_at: new Date(),
        },

        // Wishlist items for User 7
        {
          user_id: 7,
          product_id: 18,
          created_at: new Date(),
        },
        {
          user_id: 7,
          product_id: 17,
          created_at: new Date(),
        },

        // Wishlist items for User 8
        {
          user_id: 8,
          product_id: 14,
          created_at: new Date(),
        },
        {
          user_id: 8,
          product_id: 13,
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("wishlists", null, {});
  },
};
