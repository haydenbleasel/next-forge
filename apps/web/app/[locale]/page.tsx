import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-stone-50 to-stone-100">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-light mb-6 text-stone-800">
              Welkom bij Radomisli
            </h1>
            <p className="text-xl md:text-2xl text-stone-600 mb-8">
              Holistische massage, ademwerk en energetische begeleiding
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-stone-800 text-white px-8 py-3 rounded-full text-lg hover:bg-stone-700 transition-colors"
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Ontdek meer
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <svg
              className="w-6 h-6 text-stone-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Over Yuri Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-6 text-stone-800">
                Met meer dan 20 jaar ervaring
              </h2>
              <p className="text-lg text-stone-600 leading-relaxed">
                In massage, NLP en energetisch werk begeleidt Yuri je naar balans en herstel. 
                Met een unieke combinatie van professionele technieken en intuïtieve benadering, 
                help ik je om weer in contact te komen met je lichaam en geest.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2"
            >
              <Image
                src="https://placehold.co/600x400"
                alt="Yuri Radomisli aan het werk"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Diensten Section */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-12 text-stone-800">
            Wat ik voor jou kan betekenen
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Massagepraktijk',
                description: 'Holistische massage die lichaam en geest in balans brengt',
                image: 'https://placehold.co/400x300'
              },
              {
                title: 'Ademwerk',
                description: 'Ontdek de kracht van bewuste ademhaling',
                image: 'https://placehold.co/400x300'
              },
              {
                title: 'Energetische begeleiding',
                description: 'Herstel je natuurlijke energiebalans',
                image: 'https://placehold.co/400x300'
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={300}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-xl font-medium mb-2 text-stone-800">{service.title}</h3>
                <p className="text-stone-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-stone-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Klaar om een afspraak te maken?
            </h2>
            <p className="text-xl mb-8 text-stone-300">
              Boek direct jouw sessie online
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-stone-800 px-8 py-3 rounded-full text-lg hover:bg-stone-100 transition-colors"
            >
              Boek nu
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 