import { motion } from 'framer-motion'
import { useState } from 'react'

type FormData = {
  name: string
  email: string
  phone: string
  date: string
  time: string
  notes: string
}

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}
    
    if (!formData.name) newErrors.name = 'Naam is verplicht'
    if (!formData.email) newErrors.email = 'E-mail is verplicht'
    if (!formData.date) newErrors.date = 'Datum is verplicht'
    if (!formData.time) newErrors.time = 'Tijd is verplicht'
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ongeldig e-mailadres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Voor nu alleen console.log
    console.log('Form submitted:', formData)
    
    // Simuleer een API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setShowSuccess(true)
    
    // Reset form na 3 seconden
    setTimeout(() => {
      setShowSuccess(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        notes: ''
      })
    }, 3000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      {showSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <h3 className="text-2xl text-green-600 mb-4">Bedankt voor je boeking!</h3>
          <p className="text-stone-600">We nemen snel contact met je op.</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-700">
              Naam *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.name ? 'border-red-300' : 'border-stone-300'
              } focus:border-stone-500 focus:ring-stone-500`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700">
              E-mail *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors.email ? 'border-red-300' : 'border-stone-300'
              } focus:border-stone-500 focus:ring-stone-500`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-stone-700">
              Telefoonnummer (optioneel)
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-stone-700">
                Datum *
              </label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.date ? 'border-red-300' : 'border-stone-300'
                } focus:border-stone-500 focus:ring-stone-500`}
              />
              {errors.date && (
                <p className="mt-1 text-sm text-red-600">{errors.date}</p>
              )}
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-stone-700">
                Tijd *
              </label>
              <input
                type="time"
                id="time"
                value={formData.time}
                onChange={e => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className={`mt-1 block w-full rounded-md shadow-sm ${
                  errors.time ? 'border-red-300' : 'border-stone-300'
                } focus:border-stone-500 focus:ring-stone-500`}
              />
              {errors.time && (
                <p className="mt-1 text-sm text-red-600">{errors.time}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-stone-700">
              Opmerkingen (optioneel)
            </label>
            <textarea
              id="notes"
              rows={4}
              value={formData.notes}
              onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-500 focus:ring-stone-500"
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
            {isSubmitting ? 'Bezig met verzenden...' : 'Boek afspraak'}
          </motion.button>
        </form>
      )}
    </motion.div>
  )
} 