This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Production Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Go to [Vercel](https://vercel.com/new)
3. Import your GitHub repository
4. Set environment variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.onrender.com
   ```
5. Click Deploy

### Backend (Render)
1. Push code to GitHub
2. Go to [Render](https://render.com/dashboard)
3. Click "New +" -> "Web Service"
4. Connect your GitHub repository
5. Set environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pizzashop
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://your-frontend-url.vercel.app
   JWT_SECRET=your_super_secret_jwt_key_here
   ```
6. Set build command: `npm install`
7. Set start command: `npm start`
8. Click "Create Web Service"

### Important Steps
- Update `NEXT_PUBLIC_API_BASE_URL` on Vercel after backend deployment
- Update `FRONTEND_URL` on Render after frontend deployment
- Make sure MongoDB Atlas allows connections from Render
- Test both deployments before going live

# Pizza Bite Stop 🍕

A modern, full-stack pizza ordering application built with Next.js and Express.js, serving delicious pizzas, shawarmas, burgers and fast food items in Lahore.

## 🌟 Features

- **Responsive Design**: Beautiful, mobile-friendly interface built with Tailwind CSS
- **Online Ordering**: Easy-to-use ordering system for delivery and pickup
- **Menu Management**: Dynamic menu with categories (Pizza, Shawarma, Burgers, etc.)
- **Image Gallery**: Attractive food presentation with image sliders
- **Modern UI/UX**: Clean, intuitive design using Framer Motion animations
- **Admin Panel**: Content management system for menu items and orders
- **Cloud Storage**: Image uploads and management via Cloudinary

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons
- **Swiper** - Interactive image carousels

### Backend
- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Cloudinary** - Cloud image storage and management
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, pnpm, or bun
- MongoDB database
- Cloudinary account (for image storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Pizza_Shop
   ```

2. **Install frontend dependencies**
   ```bash
   cd crunchicake
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5000
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd crunchicake
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 📁 Project Structure

```
Pizza_Shop/
├── backend/                 # Express.js backend API
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── uploads/            # File upload handling
│   └── server.js           # Main server file
├── crunchicake/            # Next.js frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   ├── lib/          # Utility functions
│   │   └── styles/       # Global styles
│   ├── public/           # Static assets
│   └── package.json
└── README.md
```

## 🍕 Menu Categories

- **Pizza** - Various pizza sizes and toppings
- **Shawarma** - Traditional and fusion shawarmas
- **Burgers** - Classic and specialty burgers
- **Sides** - Fries, salads, and appetizers
- **Beverages** - Soft drinks and refreshments

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile phones

## 🔧 Development Scripts

### Frontend (crunchicake/)
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend (backend/)
```bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run tests
```

## 🌐 Deployment

### Frontend Deployment
The easiest way to deploy the Next.js frontend is using [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Backend Deployment
Deploy the Express.js backend to platforms like:
- Heroku
- AWS
- DigitalOcean
- Railway

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Contact

For ordering and inquiries:
- **Location**: Lahore, Pakistan
- **Phone**: [Your Phone Number]
- **Email**: [Your Email Address]
- **Website**: [Your Website URL]

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide React](https://lucide.dev/)
- Images hosted on [Cloudinary](https://cloudinary.com/)

---

**Pizza Bite Stop** - Serving happiness, one slice at a time! 🍕✨
