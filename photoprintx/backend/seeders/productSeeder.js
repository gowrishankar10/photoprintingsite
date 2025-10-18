const mongoose = require('mongoose');
const Product = require('../models/Product');
const config = require('../config/config');

// Connect to database
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Sample products with realistic images
    const products = [
      {
        name: '4x6 Photo Print',
        description: 'High-quality 4x6 inch photo prints on glossy or matte paper. Perfect for wallets, albums, and small displays.',
        category: 'Photo Prints',
        sizes: [
          { size: '4x6', price: 0.25 }
        ],
        paperTypes: ['Glossy', 'Matte'],
        imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: '5x7 Photo Print',
        description: 'Premium 5x7 inch photo prints perfect for framing. Ideal for desk displays and small wall decorations.',
        category: 'Photo Prints',
        sizes: [
          { size: '5x7', price: 0.50 }
        ],
        paperTypes: ['Glossy', 'Matte'],
        imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'A4 Photo Print',
        description: 'Large A4 size photo prints for posters and displays. Great for wall art and presentation purposes.',
        category: 'Photo Prints',
        sizes: [
          { size: 'A4', price: 1.00 }
        ],
        paperTypes: ['Glossy', 'Matte'],
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'Canvas Print 8x10',
        description: 'Beautiful canvas prints that bring your photos to life. Museum-quality finish with gallery wrap edges. Perfect gift to preserve precious memories with your loved ones.',
        category: 'Canvas Prints',
        sizes: [
          { size: '8x10', price: 15.00 }
        ],
        paperTypes: ['Matte'],
        imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center',
        isActive: true,
        isPremium: true,
        premiumBadge: 'Perfect Gift',
        premiumFeatures: [
          { feature: 'Museum Quality', description: 'Professional-grade materials for lasting memories' },
          { feature: 'Gallery Wrap', description: 'Ready-to-hang, perfect for home decoration' },
          { feature: 'Fade Resistant', description: '100+ year color guarantee for generations' }
        ],
        discountPercentage: 15
      },
      {
        name: 'Canvas Print 12x16',
        description: 'Large canvas prints perfect for wall decoration. Premium cotton canvas with fade-resistant inks.',
        category: 'Canvas Prints',
        sizes: [
          { size: '12x16', price: 25.00 }
        ],
        paperTypes: ['Matte'],
        imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'Canvas Print 16x20',
        description: 'Extra large canvas prints for statement wall art. Professional quality with vibrant colors.',
        category: 'Canvas Prints',
        sizes: [
          { size: '16x20', price: 35.00 }
        ],
        paperTypes: ['Matte'],
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'Photo Book 20 Pages',
        description: 'Custom photo book with 20 pages, perfect for memories. Premium matte paper with hardcover binding.',
        category: 'Photo Books',
        sizes: [
          { size: '8x8', price: 20.00 },
          { size: '10x10', price: 25.00 }
        ],
        paperTypes: ['Matte'],
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'Photo Book 40 Pages',
        description: 'Extended photo book with 40 pages for comprehensive storytelling. Perfect for weddings and events.',
        category: 'Photo Books',
        sizes: [
          { size: '8x8', price: 35.00 },
          { size: '10x10', price: 40.00 }
        ],
        paperTypes: ['Matte'],
        imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'Wall Calendar 2025',
        description: '12-month wall calendar featuring your photos. Spiral bound with premium paper and hanging hole.',
        category: 'Calendars',
        sizes: [
          { size: '12x12', price: 12.00 },
          { size: '16x20', price: 18.00 }
        ],
        paperTypes: ['Matte'],
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'Desk Calendar 2025',
        description: 'Compact desk calendar with your photos. Perfect for office spaces and personal use.',
        category: 'Calendars',
        sizes: [
          { size: '8x8', price: 8.00 }
        ],
        paperTypes: ['Matte'],
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'Photo Frame 8x10',
        description: 'Elegant wooden photo frame for your prints. Natural wood finish with glass protection.',
        category: 'Frames',
        sizes: [
          { size: '8x10', price: 8.00 }
        ],
        paperTypes: [],
        imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'Photo Frame 11x14',
        description: 'Premium wooden frame with matting. Perfect for displaying your favorite memories.',
        category: 'Frames',
        sizes: [
          { size: '11x14', price: 12.00 }
        ],
        paperTypes: [],
        imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'Metal Print 8x10',
        description: 'Modern metal prints with vibrant colors and sleek finish. Weather-resistant and fade-proof. Show your love with a gift that lasts forever.',
        category: 'Metal Prints',
        sizes: [
          { size: '8x10', price: 18.00 },
          { size: '12x16', price: 28.00 }
        ],
        paperTypes: [],
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
        isActive: true,
        isPremium: true,
        premiumBadge: 'Love & Care',
        premiumFeatures: [
          { feature: 'Weather Resistant', description: 'Outdoor durability for any space' },
          { feature: 'Vibrant Colors', description: 'HD color reproduction for stunning memories' },
          { feature: 'Sleek Finish', description: 'Modern metallic appearance that impresses' }
        ],
        discountPercentage: 25
      },
      {
        name: 'Acrylic Print 8x10',
        description: 'Crystal-clear acrylic prints with stunning depth and clarity. Modern and elegant display option.',
        category: 'Acrylic Prints',
        sizes: [
          { size: '8x10', price: 22.00 },
          { size: '12x16', price: 35.00 }
        ],
        paperTypes: [],
        imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'Bamboo Print 8x10',
        description: 'Eco-friendly bamboo prints with natural texture. Sustainable and beautiful for any space.',
        category: 'Bamboo Prints',
        sizes: [
          { size: '8x10', price: 16.00 },
          { size: '12x16', price: 24.00 }
        ],
        paperTypes: [],
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      // Album Templates
      {
        name: 'Athukulla Album Template',
        description: 'Traditional Athukulla album template with beautiful cultural designs. Perfect for preserving precious memories.',
        category: 'Album Templates',
        sizes: [
          { size: '8x8', price: 25.00 },
          { size: '10x10', price: 35.00 },
          { size: '12x12', price: 45.00 }
        ],
        paperTypes: ['Matte', 'Glossy'],
        imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'Tamil Wedding Album Template',
        description: 'Elegant Tamil wedding album template with traditional motifs and modern design elements. Create a timeless gift that celebrates love and family traditions.',
        category: 'Wedding Albums',
        sizes: [
          { size: '8x8', price: 30.00 },
          { size: '10x10', price: 40.00 },
          { size: '12x12', price: 50.00 },
          { size: '12x36', price: 80.00 }
        ],
        paperTypes: ['Matte', 'Glossy'],
        imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop&crop=center',
        isActive: true,
        isPremium: true,
        premiumBadge: 'Memories Forever',
        premiumFeatures: [
          { feature: 'Custom Design', description: 'Personalized Tamil motifs for your family' },
          { feature: 'Premium Paper', description: 'Archival quality materials for generations' },
          { feature: 'Fast Delivery', description: 'Express 3-day processing for special occasions' }
        ],
        discountPercentage: 20
      },
      {
        name: 'Muslim Wedding Album Template',
        description: 'Beautiful Muslim wedding album template with Islamic art patterns and elegant layouts.',
        category: 'Wedding Albums',
        sizes: [
          { size: '8x8', price: 30.00 },
          { size: '10x10', price: 40.00 },
          { size: '12x12', price: 50.00 },
          { size: '12x36', price: 80.00 }
        ],
        paperTypes: ['Matte', 'Glossy'],
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'Christian Wedding Album Template',
        description: 'Classic Christian wedding album template with timeless designs and romantic layouts.',
        category: 'Wedding Albums',
        sizes: [
          { size: '8x8', price: 30.00 },
          { size: '10x10', price: 40.00 },
          { size: '12x12', price: 50.00 },
          { size: '12x36', price: 80.00 }
        ],
        paperTypes: ['Matte', 'Glossy'],
        imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'Birthday Album Template',
        description: 'Fun and colorful birthday album template perfect for celebrating special moments.',
        category: 'Birthday Albums',
        sizes: [
          { size: '8x8', price: 20.00 },
          { size: '10x10', price: 30.00 },
          { size: '12x12', price: 40.00 }
        ],
        paperTypes: ['Matte', 'Glossy'],
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'Puberty Album Template',
        description: 'Special puberty album template designed for celebrating this important milestone in life.',
        category: 'Puberty Albums',
        sizes: [
          { size: '8x8', price: 25.00 },
          { size: '10x10', price: 35.00 },
          { size: '12x12', price: 45.00 }
        ],
        paperTypes: ['Matte', 'Glossy'],
        imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      // Gift and Printing
      {
        name: 'Mug Printing Service',
        description: 'High-quality mug printing with your photos or designs. Perfect for personalized gifts.',
        category: 'Mug Printing',
        sizes: [
          { size: '11oz', price: 8.00 },
          { size: '15oz', price: 10.00 },
          { size: '20oz', price: 12.00 }
        ],
        paperTypes: [],
        imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'T-shirt Printing Service',
        description: 'Custom t-shirt printing with vibrant colors and durable designs. Available in various sizes.',
        category: 'T-shirt Printing',
        sizes: [
          { size: 'S', price: 15.00 },
          { size: 'M', price: 16.00 },
          { size: 'L', price: 17.00 },
          { size: 'XL', price: 18.00 },
          { size: 'XXL', price: 20.00 }
        ],
        paperTypes: [],
        imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'Keychain Printing Service',
        description: 'Personalized keychain printing with photos or text. Durable and weather-resistant.',
        category: 'Keychain Printing',
        sizes: [
          { size: 'Small', price: 3.00 },
          { size: 'Medium', price: 5.00 },
          { size: 'Large', price: 7.00 }
        ],
        paperTypes: [],
        imageUrl: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop&crop=center',
        isActive: true
      },
      {
        name: 'Engraving Works Service',
        description: 'Professional engraving services on various materials including wood, metal, and glass. Create personalized gifts that celebrate special moments and milestones.',
        category: 'Engraving Works',
        sizes: [
          { size: 'Small', price: 10.00 },
          { size: 'Medium', price: 20.00 },
          { size: 'Large', price: 35.00 }
        ],
        paperTypes: [],
        imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center',
        isActive: true,
        isPremium: true,
        premiumBadge: 'Special Moments',
        premiumFeatures: [
          { feature: 'Hand Crafted', description: 'Artisan-level precision for unique gifts' },
          { feature: 'Multiple Materials', description: 'Wood, metal, glass options for every occasion' },
          { feature: 'Custom Design', description: 'Personalized engraving for your loved ones' },
          { feature: 'Lifetime Guarantee', description: 'Quality assurance for lasting memories' }
        ],
        discountPercentage: 30
      }
    ];

    // Insert products
    await Product.insertMany(products);
    console.log('Products seeded successfully');
    console.log(`Created ${products.length} products`);

    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
