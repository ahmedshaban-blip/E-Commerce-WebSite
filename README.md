# 🛒 E-Commerce Website

<p align="center">
  <a href="https://deepwiki.com/ahmedshaban-blip/E-Commerce-WebSite">
    <img src="https://deepwiki.com/badge.svg" width="220" alt="DeepWiki Badge">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript" alt="JavaScript">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white" alt="PayPal">
</p>

A modern, full-featured e-commerce web application built with vanilla JavaScript, offering a complete shopping experience for customers and comprehensive management tools for administrators. The application leverages Firebase for backend services, Supabase for image storage, and PayPal for secure payment processing.

## 🌟 Live Demo

[View Live Demo](https://ahmedshaban-blip.github.io/E-Commerce-WebSite/)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 👥 Customer Features

#### 🔐 Authentication & User Management
- Secure user registration and login system
- Password recovery and email verification
- User profile management

#### 🛍️ Shopping Experience
- **Product Catalog**: Comprehensive product browsing on the home page
- **Category Navigation**: Smart filtering by categories (Smartphones, Laptops, Accessories, etc.)
- **Product Details**: Detailed product pages with high-quality images, descriptions, and specifications
- **Advanced Search**: Intelligent search functionality with filters and sorting options
- **Wishlist**: Save products for later purchase

#### 🛒 Shopping Cart & Checkout
- **Dynamic Cart Management**:
  - Add products from any page
  - Real-time quantity adjustments
  - Remove items with confirmation
  - Live stock validation
  - Cart persistence across sessions
- **Secure Checkout**: Streamlined checkout process with PayPal SDK integration
- **Order Tracking**: Real-time order status updates

#### 📱 User Experience
- Responsive design for all device types
- Fast loading times with optimized images
- Intuitive navigation and user interface
- Accessibility features compliant with WCAG guidelines

### 🔧 Admin Dashboard Features

#### 🛡️ Security & Access Control
- Dedicated admin authentication system
- Role-based access control
- Secure session management

#### 📦 Product Management (Full CRUD)
- **Create**: Add products with rich details including:
  - Name, description, and specifications
  - Pricing and discount management
  - Stock quantity tracking
  - Category assignment
  - Multiple image uploads
- **Read**: Real-time product dashboard with advanced filtering
- **Update**: Edit product information with version control
- **Delete**: Safe product removal with confirmation dialogs

#### 📊 Advanced Admin Tools
- **Analytics Dashboard**: Sales metrics, popular products, and user statistics
- **Image Management**: Drag-and-drop image uploads to Supabase storage
- **Inventory Control**: Low stock alerts and automated reorder notifications
- **Order Management**: Process orders, update statuses, and manage refunds
- **User Management**: View customer accounts and order history
- **Real-time Notifications**: Instant alerts for new orders and important events

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic markup for accessibility
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Modular architecture with ES6 modules
- **Animations**: 
  - Animate.css for UI transitions
  - AOS (Animate On Scroll) for scroll-triggered animations

### Backend Services
- **Firebase Authentication**: Secure user management
- **Firebase Firestore**: NoSQL database for real-time data
- **Supabase Storage**: Scalable image hosting and management

### Payment & Integration
- **PayPal SDK**: Secure payment processing
- **RESTful APIs**: Clean API architecture for data operations

### Development Tools
- **ES6 Modules**: Modular JavaScript architecture
- **Local Storage**: Client-side data persistence
- **Service Workers**: Offline functionality (optional)

## 📁 Project Structure

```
E-Commerce-WebSite/
├── 📄 index.html                    # Main landing page
├── 📁 project js team/
│   ├── 📄 firebase-config.js        # Firebase configuration
│   ├── 📁 LoginPage/
│   │   ├── 📄 login.html
│   │   ├── 📄 login.css
│   │   └── 📄 login.js
│   ├── 📁 RegisterPage/
│   │   ├── 📄 register.html
│   │   ├── 📄 register.css
│   │   └── 📄 register.js
│   ├── 📁 AdminPage/
│   │   ├── 📁 homePage/             # Admin dashboard
│   │   │   ├── 📄 admin-home.html
│   │   │   ├── 📄 admin-home.css
│   │   │   └── 📄 admin-home.js
│   │   ├── 📁 addproduct/           # Add new products
│   │   │   ├── 📄 addproduct.html
│   │   │   ├── 📄 addproduct.css
│   │   │   └── 📄 addproduct.js
│   │   └── 📁 editproduct/          # Edit existing products
│   │       ├── 📄 editproduct.html
│   │       ├── 📄 editproduct.css
│   │       └── 📄 editproduct.js
│   └── 📁 UserPage/
│       ├── 📁 homePage/             # Customer storefront
│       │   ├── 📄 user-home.html
│       │   ├── 📄 user-home.css
│       │   └── 📄 user-home.js
│       ├── 📁 ProductDetailsPage/   # Product detail views
│       │   ├── 📄 product-details.html
│       │   ├── 📄 product-details.css
│       │   └── 📄 product-details.js
│       ├── 📁 cartPage/             # Shopping cart
│       │   ├── 📄 cart.html
│       │   ├── 📄 cart.css
│       │   └── 📄 cart.js
│       └── 📁 paypalPage/           # Checkout & payment
│           ├── 📄 paypal.html
│           ├── 📄 paypal.css
│           └── 📄 paypal.js
├── 📁 assets/
│   ├── 📁 images/                   # Static images
│   ├── 📁 icons/                    # Icon assets
│   └── 📁 css/                      # Global stylesheets
└── 📄 README.md
```

## 📸 Screenshots

### Customer Interface
![Homepage](screenshots/homepage.png)
*Modern product catalog with category filtering*

![Product Details](screenshots/product-details.png)
*Detailed product view with image gallery*

![Shopping Cart](screenshots/cart.png)
*Intuitive cart management interface*

### Admin Dashboard
![Admin Dashboard](screenshots/admin-dashboard.png)
*Comprehensive admin control panel*

![Product Management](screenshots/product-management.png)
*Advanced product CRUD operations*

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A code editor (VS Code recommended)
- Live Server extension for local development
- Active internet connection for CDN resources

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahmedshaban-blip/E-Commerce-WebSite.git
   cd E-Commerce-WebSite
   ```

2. **Set up development environment**
   - Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code
   - Open the project folder in VS Code
   - Right-click on `index.html` and select "Open with Live Server"

3. **Create Firebase project**
   - Go to [Firebase Console](https://firebase.google.com/)
   - Click "Create a project" and follow the setup wizard
   - Enable the following services:
     - **Authentication**: Enable Email/Password provider
     - **Firestore Database**: Create in production mode
     - **Storage**: Set up for image uploads (optional)

4. **Create Supabase project**
   - Visit [Supabase Dashboard](https://supabase.com/)
   - Create a new project
   - Navigate to Storage and create a bucket named `images`
   - Set appropriate RLS (Row Level Security) policies:
     ```sql
     -- Allow public reads
     CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (true);
     
     -- Allow authenticated uploads
     CREATE POLICY "Authenticated uploads" ON storage.objects 
     FOR INSERT WITH CHECK (auth.role() = 'authenticated');
     ```

5. **Set up PayPal Developer Account**
   - Create a [PayPal Developer](https://developer.paypal.com/) account
   - Create a new application to get your Client ID
   - Use sandbox credentials for testing

## ⚙️ Configuration

### Firebase Configuration

Update `project js team/firebase-config.js`:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### Supabase Configuration

Update `project js team/AdminPage/addproduct/addproduct.js`:

```javascript
const supabaseUrl = 'https://your-project-ref.supabase.co';
const supabaseKey = 'your-anon-public-key';
```

### PayPal Configuration

Update the client-id in `project js team/UserPage/paypalPage/paypal.html`:

```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&currency=USD"></script>
```

### Admin Access Configuration

Update `project js team/RegisterPage/register.js`:

```javascript
const allowedAdminIDs = [
  "admin001",
  "admin002", 
  "your-custom-admin-id"
];
```

## 🎯 Usage

### For Customers

1. **Registration**: 
   - Navigate to the registration page
   - Select "User" account type
   - Complete the registration form
   - Verify your email address

2. **Shopping**:
   - Browse products on the homepage
   - Use category filters to narrow down options
   - Click on products for detailed information
   - Add items to cart and proceed to checkout

3. **Account Management**:
   - View order history
   - Update profile information
   - Manage shipping addresses

### For Administrators

1. **Registration**:
   - Navigate to the registration page
   - Select "Admin" account type
   - Enter a valid Admin ID from the allowed list
   - Complete registration and await approval

2. **Product Management**:
   - Access the admin dashboard after login
   - Use the "Add Product" feature to create new listings
   - Edit existing products through the product management interface
   - Monitor inventory levels and update stock

3. **Order Processing**:
   - Receive real-time notifications for new orders
   - Update order statuses
   - Process refunds when necessary

## 📚 API Documentation

### Firebase Firestore Collections

#### Users Collection
```javascript
{
  uid: "user-unique-id",
  email: "user@example.com",
  role: "user" | "admin",
  profile: {
    firstName: "John",
    lastName: "Doe",
    phone: "+1234567890",
    address: {...}
  },
  createdAt: timestamp,
  lastLogin: timestamp
}
```

#### Products Collection
```javascript
{
  id: "product-unique-id",
  name: "Product Name",
  description: "Detailed product description",
  price: 99.99,
  discountPrice: 79.99,
  category: "smartphones",
  stock: 50,
  images: ["url1", "url2", "url3"],
  specifications: {...},
  createdBy: "admin-uid",
  createdAt: timestamp,
  updatedAt: timestamp,
  isActive: true
}
```

#### Orders Collection
```javascript
{
  id: "order-unique-id",
  userId: "user-uid",
  items: [
    {
      productId: "product-id",
      quantity: 2,
      price: 99.99,
      name: "Product Name"
    }
  ],
  total: 199.98,
  status: "pending" | "processing" | "shipped" | "delivered",
  shippingAddress: {...},
  paymentMethod: "paypal",
  paymentId: "paypal-transaction-id",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- Follow existing code style and conventions
- Write clear, descriptive commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Bug Reports & Feature Requests

Please use [GitHub Issues](https://github.com/ahmedshaban-blip/E-Commerce-WebSite/issues) to report bugs or request features.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ahmed Shaban**
- GitHub: [@ahmedshaban-blip](https://github.com/ahmedshaban-blip)
- Email: ahmed.shabaan.dev@gmail.com

## 🙏 Acknowledgments

- Firebase team for excellent backend services
- Supabase for reliable image storage
- PayPal for secure payment processing
- The open-source community for inspiration and resources

## 🔮 Roadmap

- [ ] Multi-language support
- [ ] Progressive Web App (PWA) features
- [ ] Advanced analytics dashboard
- [ ] Email notification system
- [ ] Product reviews and ratings
- [ ] Social media integration
- [ ] Mobile app development

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/ahmedshaban-blip">Ahmed Shaban</a>
</p>
