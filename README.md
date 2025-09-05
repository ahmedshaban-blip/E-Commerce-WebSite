# E-Commerce Website
<p align="center">
  <a href="https://deepwiki.com/ahmedshaban-blip/E-Commerce-WebSite">
    <img src="https://deepwiki.com/badge.svg" width="220">
  </a>
</p>

This is a full-featured e-commerce web application built with vanilla JavaScript, Firebase for backend services, and Supabase for image storage. It provides a complete shopping experience for users and a comprehensive management dashboard for administrators.

## Features

### Customer-Facing (User) Features
- **User Authentication**: Secure user registration and login.
- **Product Catalog**: Browse all available products on the home page.
- **Category Navigation**: Filter and view products by specific categories (Smart Phone, Laptop, Accessories, etc.).
- **Product Details**: Click on any product to view its detailed description, price, and images.
- **Shopping Cart**:
    - Add products to the cart directly from the home page or product details page.
    - View all items in the cart.
    - Adjust item quantities (increase/decrease).
    - Remove items from the cart.
    - Real-time stock updates are reflected in the cart.
- **Search**: Find products using the search bar.
- **Checkout**: Seamless checkout process powered by the PayPal SDK.

### Admin Dashboard Features
- **Secure Admin Access**: Separate login for administrators.
- **Product Management (CRUD)**:
    - **Create**: Add new products with details like name, description, price, stock quantity, category, and image.
    - **Read**: View all products created by the admin in a real-time dashboard.
    - **Update**: Edit the details of existing products.
    - **Delete**: Remove products from the store.
- **Image Handling**: Product images are uploaded to and served from a Supabase storage bucket.
- **Filtering & Searching**: Easily find products within the dashboard by category or name.
- **Stock Management**: View stock levels for each product, displayed clearly on product cards.
- **Order Notifications**: Receive real-time toast notifications when a user confirms an order.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6 Modules)
- **Backend-as-a-Service (BaaS)**:
    - **Firebase Authentication**: For user registration and login.
    - **Firebase Firestore**: As the primary NoSQL database for storing user data, products, and cart information.
- **Image Storage**: **Supabase Storage** for hosting product images.
- **Payment Gateway**: **PayPal SDK** for processing payments.
- **Styling/Animations**:
    - Animate.css & AOS (Animations on Scroll) for UI enhancements.

## Project Structure

The project is organized into distinct pages and modules for clarity:

-   **/LoginPage**: Contains the HTML, CSS, and JS for the user/admin login page.
-   **/RegisterPage**: Handles new user and admin registration.
-   **/AdminPage**: A dedicated section for administrators.
    -   `/homePage`: The main admin dashboard to view and manage products.
    -   `/addproduct`: Form to add a new product.
    -   `/editproduct`: Form to edit an existing product.
-   **/UserPage**: The main e-commerce storefront for customers.
    -   `/homePage`: The main landing page with product listings and categories.
    -   `/ProductDetailsPage`: Shows the details for a single selected product.
    -   `/cartPage`: The user's shopping cart.
    -   `/paypalPage`: The final checkout page with PayPal integration.
-   **firebase-config.js**: Central configuration file for connecting to Firebase services.

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ahmedshaban-blip/E-Commerce-WebSite.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd E-Commerce-WebSite
    ```

3.  **Run with a Live Server:**
    Open the root `index.html` file using a live server. We recommend the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code.

4.  **Set up Backend Services:**
    - Create a new project on [Firebase](https://firebase.google.com/).
    - Enable **Firestore Database** and **Firebase Authentication** (Email/Password provider).
    - Create a new project on [Supabase](https://supabase.com/).
    - In Supabase, create a new storage bucket named `images`. Ensure that you have configured the appropriate access policies to allow public reads and authenticated uploads.

5.  **Configure API Keys:**
    You must update the configuration files with your own API keys and project details.

    -   **Firebase Config**: Open `project js team/firebase-config.js` and replace the placeholder `firebaseConfig` object with your project's configuration keys.
    -   **Supabase Config**: Open `project js team/AdminPage/addproduct/addproduct.js` and update the `supabaseUrl` and `supabaseKey` variables with your Supabase project URL and anon key.
    -   **PayPal Config**: Open `project js team/UserPage/paypalPage/paypal.html` and replace the `client-id` in the PayPal script URL with your own PayPal Developer client ID.
    -   **Admin IDs**: To register an admin, you must use a pre-approved ID. Open `project js team/RegisterPage/register.js` and modify the `allowedAdminIDs` array with the IDs you wish to use for admin registration.

## Usage

-   **To Register as a User**: Navigate to the registration page, select the "User" radio button, and fill in your details.
-   **To Register as an Admin**: Navigate to the registration page, select the "Admin" radio button. An "Your ID" field will appear. You must enter one of the IDs from the `allowedAdminIDs` array configured in `register.js` to successfully register as an administrator.
