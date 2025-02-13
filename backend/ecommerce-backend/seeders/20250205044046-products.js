"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("products", [
      {
        name: "Wireless Headphones",
        description: "High-quality noise-canceling headphones.",
        price: 199.99,
        stock: 50,
        category_id: 1,
        image_url: "wirelessheadphone.webp",
        created_at: new Date(), // Added created_at field
        updated_at: new Date(), // Added updated_at field
      },
      {
        name: "Gaming Mouse",
        description: "Ergonomic gaming mouse with 12 programmable buttons.",
        price: 59.99,
        stock: 120,
        category_id: 7,
        image_url: "gaming-mouse.webp",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Mechanical Keyboard",
        description: "Compact mechanical keyboard with blue switches.",
        price: 89.99,
        stock: 75,
        category_id: 1,
        image_url: "mechanical-keyboard.webp",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "4K Monitor",
        description: "32-inch UHD 4K monitor with HDR.",
        price: 399.99,
        stock: 30,
        category_id: 1,
        image_url: "4K-monitor.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Smartwatch",
        description: "Water-resistant smartwatch with heart rate monitoring.",
        price: 129.99,
        stock: 90,
        category_id: 1,
        image_url: "smartwatch.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Portable SSD",
        description: "1TB ultra-fast portable SSD.",
        price: 149.99,
        stock: 200,
        category_id: 1,
        image_url: "protable-SSD.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bluetooth Speaker",
        description: "Compact wireless speaker with deep bass.",
        price: 79.99,
        stock: 110,
        category_id: 6,
        image_url: "bluetooth-speaker.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Smartphone Stand",
        description: "Adjustable aluminum stand for smartphones.",
        price: 19.99,
        stock: 500,
        category_id: 7,
        image_url: "stand.webp",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "VR Headset",
        description: "Immersive VR headset with motion tracking.",
        price: 249.99,
        stock: 40,
        category_id: 7,
        image_url: "VR.webp",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "External Hard Drive",
        description: "5TB external hard drive.",
        price: 99.99,
        stock: 150,
        category_id: 5,
        image_url: "externalhardrives.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Shopping Cart",
        description: "Online shopping cart for convenient purchases.",
        price: 0.0,
        stock: 1000,
        category_id: 3,
        image_url: "shopping.webp",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
