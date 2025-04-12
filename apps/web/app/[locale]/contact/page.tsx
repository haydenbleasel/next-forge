import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Voor nu alleen console.log
    console.log('Contact form submitted:', formData)

    // Simuleer een API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setShowSuccess(true)

    // Reset form na 3 seconden
    setTimeout(() => {
      setShowSuccess(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <div className="min-h-screen py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-light mb-6 text-stone-800">
              Contact
            </h1>
            <p className="text-lg text-stone-600">
              Heb je een vraag of wil je meer informatie? Neem gerust contact met me op.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-light mb-6 text-stone-800">
                Contactgegevens
              </h2>
              <div className="space-y-4">
                <p className="flex items-center text-stone-600">
                  <svg
                    className="w-5 h-5 mr-3 text-stone-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  info@radomisli.com
                </p>
                <p className="flex items-center text-stone-600">
                  <svg
                    className="w-5 h-5 mr-3 text-stone-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +31 6 12345678
                </p>
                <p className="flex items-center text-stone-600">
                  <svg
                    className="w-5 h-5 mr-3 text-stone-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Amsterdam, Nederland
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              {showSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <h3 className="text-2xl text-green-600 mb-4">
                    Bedankt voor je bericht!
                  </h3>
                  <p className="text-stone-600">
                    Ik neem zo snel mogelijk contact met je op.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-stone-700"
                    >
                      Naam
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={e =>
                        setFormData(prev => ({ ...prev, name: e.target.value }))
                      }
                      className="mt-1 block w-full rounded-md border-stone-300 shadow-sm 
                      focus:border-stone-500 focus:ring-stone-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-stone-700"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={e =>
                        setFormData(prev => ({ ...prev, email: e.target.value }))
                      }
                      className="mt-1 block w-full rounded-md border-stone-300 shadow-sm 
                      focus:border-stone-500 focus:ring-stone-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-stone-700"
                    >
                      Bericht
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e =>
                        setFormData(prev => ({ ...prev, message: e.target.value }))
                      }
                      className="mt-1 block w-full rounded-md border-stone-300 shadow-sm 
                      focus:border-stone-500 focus:ring-stone-500"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                      isSubmitting
                        ? 'bg-stone-400 cursor-not-allowed'
                        : 'bg-stone-800 hover:bg-stone-700'
                    }`}
                  >
                    {isSubmitting ? 'Verzenden...' : 'Verstuur bericht'}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
