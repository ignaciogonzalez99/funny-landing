// src/LandingPage.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ShoppingBag, Heart, User, Palette, X } from 'lucide-react'

type Theme = 'default' | 'dark' | 'light'

interface Themes {
  [key: string]: {
    primary: string
    secondary: string
    accent: string
  }
}

const themes: Themes = {
  default: {
    primary: '#ffffff',
    secondary: '#000000',
    accent: '#3b82f6',
  },
  dark: {
    primary: '#1a1a1a',
    secondary: '#ffffff',
    accent: '#f59e0b',
  },
  light: {
    primary: '#f3f4f6',
    secondary: '#1f2937',
    accent: '#10b981',
  },
}

const LandingPage: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  const [currentTheme, setCurrentTheme] = useState<Theme>('default')
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState<boolean>(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    Object.entries(themes[currentTheme]).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value)
    })
  }, [currentTheme])

  const changeTheme = (theme: Theme) => {
    setCurrentTheme(theme)
    setIsColorPaletteOpen(false)
  }

  return (
    <div className="min-h-screen bg-primary text-secondary overflow-hidden transition-colors duration-300">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-primary/80 backdrop-blur-md py-2' : 'py-6'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            Elegance Atelier
          </motion.h1>
          <ul className="flex space-x-8">
            {['Shop', 'Collections', 'About', 'Contact'].map((item, index) => (
              <motion.li 
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <a href="#" className="hover:text-accent transition-colors">{item}</a>
              </motion.li>
            ))}
          </ul>
          <div className="flex space-x-4 items-center">
            <ShoppingBag className="w-6 h-6 cursor-pointer hover:text-accent transition-colors" />
            <Heart className="w-6 h-6 cursor-pointer hover:text-accent transition-colors" />
            <User className="w-6 h-6 cursor-pointer hover:text-accent transition-colors" />
            <div className="relative">
              <Palette 
                className="w-6 h-6 cursor-pointer hover:text-accent transition-colors"
                onClick={() => setIsColorPaletteOpen(!isColorPaletteOpen)}
              />
              {isColorPaletteOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 py-2 w-48 bg-primary shadow-xl rounded-md"
                >
                  {Object.keys(themes).map((theme) => (
                    <button
                      key={theme}
                      onClick={() => changeTheme(theme as Theme)}
                      className="block w-full text-left px-4 py-2 hover:bg-accent hover:text-primary transition-colors"
                    >
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <motion.section 
        style={{ opacity, scale }}
        className="relative h-screen flex items-center justify-center"
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://cdn.pixabay.com/vimeo/190803540/fashion-9908.mp4?width=1280&hash=e7a1d9c5e0e6c1c3e9c5e0e6c1c3e9c5e0e6c1c3" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-secondary/50" />
        <div className="relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            Redefine Your Style
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl md:text-2xl mb-8"
          >
            Discover the latest in high-end fashion
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="bg-accent text-primary px-8 py-3 rounded-full font-semibold hover:bg-accent/80 transition-colors"
          >
            Shop Now
          </motion.button>
        </div>
      </motion.section>

      <section className="py-20 bg-secondary text-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Summer Breeze', 'Urban Chic', 'Evening Glamour'].map((collection, index) => (
              <motion.div 
                key={collection}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg"
              >
                <img 
                  src={`/placeholder.svg?height=400&width=300&text=${encodeURIComponent(collection)}`}
                  alt={collection}
                  className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-accent text-primary px-6 py-2 rounded-full font-semibold hover:bg-accent/80 transition-colors">
                    View Collection
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Sustainable Materials', value: '100%' },
              { title: 'Satisfied Customers', value: '10k+' },
              { title: 'Unique Designs', value: '500+' }
            ].map((stat, index) => (
              <motion.div 
                key={stat.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</h3>
                <p className="text-xl text-secondary/60">{stat.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary text-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in Style</h2>
            <p className="text-xl mb-8">Subscribe to our newsletter for exclusive offers and fashion tips.</p>
            <form className="flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-4 py-3 rounded-full bg-primary text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <button 
                type="submit"
                className="px-8 py-3 rounded-full bg-accent text-primary font-semibold hover:bg-accent/80 transition-colors flex items-center justify-center"
              >
                Subscribe <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Elegance Atelier</h3>
              <p className="text-secondary/60">Redefining fashion, one piece at a time.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Shop', 'About', 'Contact'].map(item => (
                  <li key={item}><a href="#" className="text-secondary/60 hover:text-accent transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2">
                {['Facebook', 'Instagram', 'Twitter', 'Pinterest'].map(item => (
                  <li key={item}><a href="#" className="text-secondary/60 hover:text-accent transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <address className="text-secondary/60 not-italic">
                1234 Fashion Avenue<br />
                New York, NY 10001<br />
                Email: <a href="mailto:info@eleganceatelier.com" className="hover:text-accent transition-colors">info@eleganceatelier.com</a><br />
                Phone: <a href="tel:+11234567890" className="hover:text-accent transition-colors">(123) 456-7890</a>
              </address>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-secondary/20 text-center text-secondary/60">
            <p>&copy; 2024 Elegance Atelier. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </motion.a>
    </div>
  )
}

export default LandingPage
