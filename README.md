# OptiBuy - Your wallet's favorite algorithm

OptiBuy is a production-ready web application that helps users find the best deals across multiple e-commerce platforms. Built with Next.js 14, it features cross-platform price comparison, AI-powered shopping assistance, and smart price alerts.

## 🚀 Features

- **Cross-Platform Price Comparison**: Compare prices across Amazon, Temu, and Shein
- **AI DealBot Assistant**: Get personalized shopping recommendations via chat
- **Price History Analytics**: 6-month price tracking with trend analysis
- **Smart Price Alerts**: Set target prices and get notified when they drop
- **Modern UI**: Beautiful, responsive interface with dark/light theme support
- **Real-time Data**: Live price updates and coupon discovery

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- **Charts**: Recharts for price history visualization
- **Authentication**: NextAuth.js
- **Validation**: Zod
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd OptiBuy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Set up the database:
```bash
npx prisma db push
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
```

## 🗄️ Database Setup

The application uses Prisma ORM with SQLite for development and PostgreSQL for production.

### Database Schema

- **Users**: User accounts and authentication
- **Products**: Product information and metadata
- **Prices**: Price history across platforms
- **Coupons**: Active discount codes and offers
- **Alerts**: User-defined price alerts
- **Chat Sessions**: AI conversation history

### Seeding Data

Run the seed script to populate the database with sample data:

```bash
npm run db:seed
```

## 🎯 Pages & Features

### Compare Page (`/`)
- Hero section with product search
- Product comparison across platforms
- Price history charts with Recharts
- Coupon discovery and scoring

### Chat Page (`/chat`)
- AI DealBot assistant interface
- Real-time conversation with shopping recommendations
- Contextual product suggestions

### Alerts Page (`/alerts`)
- Create and manage price alerts
- View alert statistics and status
- Target price notifications

### Docs Page (`/docs`)
- Comprehensive documentation
- Feature explanations and tutorials
- FAQ and troubleshooting

## 🔧 API Routes

- `/api/products/search` - Product search and filtering
- `/api/products/[id]` - Individual product details and price history
- `/api/coupons/search` - Coupon discovery and validation
- `/api/chat` - AI assistant chat functionality
- `/api/auth/[...nextauth]` - Authentication endpoints

## 🎨 UI Components

Built with shadcn/ui components:
- Responsive navigation with theme toggle
- Product cards with price comparison
- Interactive price charts
- Chat interface with message bubbles
- Alert management dialogs

## 🔐 Authentication

NextAuth.js integration with:
- Credentials provider (demo implementation)
- JWT session strategy
- Protected routes and API endpoints

## 📱 Responsive Design

- Mobile-first approach
- Responsive navigation
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🚀 Deployment

The application is ready for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Configure PostgreSQL database for production
4. Deploy automatically on push to main branch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with Next.js and the amazing React ecosystem
- UI components from shadcn/ui
- Icons from Lucide React
- Charts powered by Recharts

---

**OptiBuy** - Never overpay again! 💰