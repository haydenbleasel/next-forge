import { motion } from 'framer-motion'
import BookingForm from '../../../components/BookingForm'

export default function BookingPage() {
  return (
    <div className="min-h-screen py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-light text-center mb-8 text-stone-800">
            Boek een sessie
          </h1>
          <p className="text-lg text-center mb-12 text-stone-600">
            Kies een datum en tijd die jou het beste uitkomt. 
            Ik neem zo snel mogelijk contact met je op om de afspraak te bevestigen.
          </p>
          <BookingForm />
        </motion.div>
      </div>
    </div>
  )
} 