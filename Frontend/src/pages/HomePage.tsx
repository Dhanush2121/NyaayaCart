import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Sprout, Users, TrendingUp, Shield, ArrowRight, Star, CheckCircle } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();


  // Inside HomePage component, near top:
const slides = [
  {
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Connecting Farmers with Verified Suppliers'
  },
  {
    image: 'https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Real-time Agricultural Market Insights'
  },
  {
    image: 'https://images.pexels.com/photos/1875021/pexels-photo-1875021.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Seamless Online Ordering of Farm Products'
  },
  {
    image: 'https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=600',
    caption: 'Secure Payment & Transaction System'
  }
];

const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000); // 2 seconds
    return () => clearInterval(interval);
  }, []);


  const features = [
    {
      icon: Sprout,
      title: 'Premium Agricultural Products',
      description: 'Access to high-quality seeds, fertilizers, and farming equipment from verified suppliers.'
    },
    {
      icon: Users,
      title: 'Trusted Network',
      description: 'Connect with verified vendors and suppliers in the agricultural ecosystem.'
    },
    {
      icon: TrendingUp,
      title: 'Market Insights',
      description: 'Real-time pricing and market trends to make informed business decisions.'
    },
    {
      icon: Shield,
      title: 'Secure Transactions',
      description: 'Safe and secure payment processing with buyer protection guarantees.'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Farm Owner',
      content: 'AgriConnect has transformed how I source my farming supplies. The quality and reliability are unmatched.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Agricultural Supplier',
      content: 'As a supplier, this platform has helped me reach more customers and grow my business significantly.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      role: 'Organic Farmer',
      content: 'The variety of organic products available here is incredible. Highly recommend to fellow farmers.',
      rating: 5
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '500+', label: 'Verified Suppliers' },
    { number: '50,000+', label: 'Products Listed' },
    { number: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Sprout className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                NyaayaCart
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/auth')}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate('/auth')}
                className="bg-green-600 hover:bg-green-700"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Connecting
                  <span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Agricultural
                  </span>
                  Excellence
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  The premier B2B marketplace for agricultural products. Connect with trusted suppliers, 
                  discover premium farming solutions, and grow your agricultural business with confidence.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => navigate('/auth')}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Start Your Journey
                </Button>
                <Button
                  onClick={() => navigate('/auth')}
                  variant="outline"
                  size="lg"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white text-lg px-8 py-4"
                >
                  Learn More
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-green-600">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="max-w-4xl mx-auto px-4 text-center">
    <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
      <img
        src={slides[currentSlide].image}
        alt={`Slide ${currentSlide + 1}`}
        className="w-full h-96 object-cover transition-all duration-500"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-4 px-6 text-lg font-semibold">
        {slides[currentSlide].caption}
      </div>
    </div>
  </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-br from-emerald-400 to-green-400 rounded-2xl opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose AgriConnect?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to succeed in the agricultural marketplace, 
              from premium products to trusted partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} hover className="text-center p-8 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Categories */}
     // Rest of the code remains the same until this section...

{/* Product Categories */}
<section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Agricultural Product Categories
      </h2>
      <p className="text-xl text-gray-600">
        Discover our comprehensive range of agricultural products and solutions
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          title: 'Fresh Onions',
          image: 'https://images.pexels.com/photos/1437585/pexels-photo-1437585.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Locally sourced red and white onions for various culinary uses.'
        },
        {
          title: 'Juicy Tomatoes',
          image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'High-quality ripe tomatoes perfect for sauces and street food.'
        },
        {
          title: 'Green Cabbage',
          image: 'https://images.pexels.com/photos/1437584/pexels-photo-1437584.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Fresh cabbages ideal for salads and fast food toppings.'
        },
        {
          title: 'Organic Potatoes',
          image: 'https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Versatile potatoes great for fries, curries, and snacks.'
        },
        {
          title: 'Garlic Bulbs',
          image: 'https://images.pexels.com/photos/6644154/pexels-photo-6644154.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Pungent garlic perfect for flavoring and seasoning dishes.'
        },
        {
          title: 'Spicy Chillies',
          image: 'https://images.pexels.com/photos/208450/pexels-photo-208450.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Fresh red and green chillies for heat and flavor.'
        }
      ].map((category, index) => (
        <Card key={index} hover className="overflow-hidden group">
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{category.title}</h3>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <Button
              onClick={() => navigate('/auth')}
              variant="outline"
              className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              Explore Products
            </Button>
          </div>
        </Card>
      ))}
    </div>
  </div>
</section>


      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied farmers and suppliers who trust AgriConnect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-green-600">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Agricultural Business?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join AgriConnect today and connect with the best suppliers and vendors in the agricultural industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/auth')}
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-4"
              >
                Start Free Trial
              </Button>
              <Button
                onClick={() => navigate('/auth')}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-4"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sprout className="w-8 h-8 text-green-400" />
                <h3 className="text-xl font-bold">AgriConnect</h3>
              </div>
              <p className="text-gray-400">
                Connecting agricultural excellence through trusted partnerships and premium products.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Seeds & Seedlings</li>
                <li>Fertilizers</li>
                <li>Farm Equipment</li>
                <li>Irrigation Systems</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Careers</li>
                <li>Blog</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Community</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AgriConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};