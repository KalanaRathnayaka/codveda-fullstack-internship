# Level 3 - Task 2: WebSockets for Real-Time Communication

## Task Description
This task was completed by implementing real-time product notifications using Socket.io.

The application sends live notifications when product-related actions happen in the system.

## Technologies Used
- Node.js
- Express.js
- Socket.io
- React.js
- socket.io-client
- MongoDB Atlas
- Mongoose

## Features Implemented
- Socket.io server setup in backend
- Socket.io client setup in React frontend
- Real-time product list refresh
- Admin dashboard live notifications
- Public bell notification system
- Notification count badge
- Notification dropdown
- Clear single notification
- Clear all notifications

## Admin Notifications
When an admin adds, updates, or deletes a product, the admin dashboard receives real-time notifications.

Examples:
- New product added: RTX 4050 TI Super
- Product updated: Liquid Cooler 360
- Product deleted: RTX 3060 TI

## Public User Notifications
When a new product is added by the admin, logout/home users receive a bell notification.

Example:
New product added to store: RTX 4050 TI Super

Only new product notifications are shown to public users. Product update and delete notifications are not shown to public users.

## Notification Clear Feature
Users can clear notifications in two ways:
- Clear one notification using the close button
- Clear all notifications using the Clear All button

## Backend Implementation
The backend uses Socket.io with the Express HTTP server.

Events used:
- productNotification
- newProductNotification
- productsChanged

## Frontend Implementation
The React frontend listens to Socket.io events and updates the UI in real time.

Admin users see the Admin Live Notifications panel.  
Public users see notifications through the bell icon.


## GitHub Repository
Repository Link: https://github.com/KalanaRathnayaka/codveda-fullstack-internship