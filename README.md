# 🛒 NyaayaCart - B2B Marketplace Platform

NyaayaCart is a scalable and secure **B2B Marketplace** web application where vendors and suppliers can register, manage products, and handle orders. Admins have a centralized dashboard to manage users and monitor activity.

## 🚀 Live Demo

- 🌐 Frontend: [https://nyaaya-cart.vercel.app](https://nyaaya-cart.vercel.app)

## 📦 Features

### 👤 Authentication & Authorization
- Role-based login: `admin`, `vendor`, `supplier`
- Secure registration and JWT-based authentication
- Admin login is static; vendors and suppliers register dynamically

### 📦 Product Management
- Vendors can add, edit, and delete their products
- Suppliers can view available products

### 📑 Order Management
- Suppliers can place orders for products
- Vendors can view orders placed on their items

### 🛠 Admin Panel
- View all users and products
- Manage or restrict platform usage if needed

---

## 🧰 Tech Stack

| Layer      | Tech                                                                 |
|------------|----------------------------------------------------------------------|
| Frontend   | React, Tailwind CSS, Vite, Axios, React Router                       |
| Backend    | Node.js, Express.js, MongoDB Atlas, Mongoose                         |
| Auth       | JWT, bcryptjs                                                        |
| Hosting    | Vercel (frontend), Render (backend), MongoDB Atlas (cloud database) |



---

## 🔐 Admin Login (for testing)

```bash
Email: admin@example.com
Password: admin123
