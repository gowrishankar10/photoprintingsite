# We3Studio - Photo Printing Web Application

A modern, full-stack photo printing web application built with Angular 17 frontend and Node.js backend.

## 🚀 Features

### Frontend (Angular 17)
- **Modern UI/UX**: Professional design with Material Design components
- **Responsive Design**: Mobile-first approach with perfect mobile experience
- **Product Catalog**: Browse and filter products by category
- **User Authentication**: Secure login and registration system
- **Admin Dashboard**: Comprehensive admin panel with analytics
- **Bulk Operations**: Advanced product management capabilities
- **Data Export**: CSV export functionality for all data types
- **Contact System**: Professional contact page with multiple contact methods

### Backend (Node.js + Express)
- **RESTful API**: Clean, well-structured API endpoints
- **MongoDB Integration**: Scalable database with Mongoose ODM
- **Image Upload**: Cloudinary integration for image management
- **Authentication**: JWT-based secure authentication
- **Order Management**: Complete order processing system
- **Payment Integration**: Razorpay payment gateway integration
- **Admin Features**: Advanced admin functionality

### Key Features
- **Product Management**: Add, edit, delete, and bulk manage products
- **Customer Management**: User registration, profiles, and order history
- **Revenue Analytics**: Comprehensive revenue tracking and analytics
- **Premium Products**: Special gift-focused product features
- **Mobile Responsive**: Perfect experience on all devices
- **Professional Design**: Modern, business-focused UI

## 🛠️ Technology Stack

### Frontend
- **Angular 17**: Latest Angular framework
- **Angular Material**: Material Design components
- **TypeScript**: Type-safe development
- **SCSS**: Advanced styling capabilities
- **RxJS**: Reactive programming

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Token authentication
- **Cloudinary**: Image upload and management
- **Razorpay**: Payment processing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Cloudinary account (for image uploads)
- Razorpay account (for payments)

### Backend Setup
```bash
cd photoprintx/backend
npm install
cp .env.example .env
# Configure your environment variables
npm start
```

### Frontend Setup
```bash
cd photoprintx/frontend
npm install
ng serve
```

### Environment Variables
Create a `.env` file in the backend directory with:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## 🚀 Deployment

### Frontend (Angular)
```bash
cd photoprintx/frontend
ng build --configuration production
# Deploy dist/ folder to your hosting service
```

### Backend (Node.js)
```bash
cd photoprintx/backend
npm install --production
# Deploy to your server (Heroku, DigitalOcean, AWS, etc.)
```

## 📱 Usage

### For Customers
1. **Browse Products**: Visit the product catalog
2. **View Details**: Click on products for detailed information
3. **Contact**: Use the contact page for inquiries
4. **Register**: Create an account for orders

### For Admins
1. **Login**: Use admin credentials to access dashboard
2. **Manage Products**: Add, edit, delete products
3. **Bulk Operations**: Perform bulk updates on products
4. **View Analytics**: Monitor revenue and performance
5. **Export Data**: Download data in CSV format

## 🔐 Default Credentials

### Admin Account
- **Email**: admin@example.com
- **Password**: admin123

### User Account
- **Email**: user@example.com
- **Password**: user123

## 📊 Admin Dashboard Features

- **Revenue Analytics**: Comprehensive revenue tracking
- **Product Management**: Advanced product CRUD operations
- **Customer Management**: User and customer data management
- **Bulk Operations**: Mass product updates
- **Data Export**: CSV export for all data types
- **Settings Management**: Business configuration
- **Real-time Updates**: Dynamic data filtering and updates

## 🎨 Design Features

- **Modern UI**: Clean, professional design
- **Material Design**: Google Material Design principles
- **Responsive**: Perfect on desktop, tablet, and mobile
- **Accessibility**: WCAG compliant design
- **Performance**: Optimized for speed and efficiency

## 🔧 Development

### Running in Development
```bash
# Start backend
cd photoprintx/backend
npm run dev

# Start frontend (in another terminal)
cd photoprintx/frontend
ng serve
```

### Building for Production
```bash
# Build frontend
cd photoprintx/frontend
ng build --configuration production

# Build backend
cd photoprintx/backend
npm run build
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please contact us through the contact page or create an issue in this repository.

---

**We3Studio** - Professional Photo Printing Solutions
