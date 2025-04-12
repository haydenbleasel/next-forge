import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const services = [
  {
    title: 'Holistische massagepraktijk',
    description: `Ervaar diepe ontspanning en herstel door een holistische massage die lichaam en geest verbindt. 
    Ik combineer verschillende technieken om spanning los te laten en je natuurlijke balans te herstellen.`,
    image: 'https://placehold.co/800x600',
    link: '/nl/boeken'
  },
  {
    title: 'Ademwerk',
    description: `Ontdek de kracht van bewuste ademhaling. Door specifieke ademhalingstechnieken leer je stress 
    te verminderen, je energie te verhogen en dieper contact te maken met jezelf.`,
    image: 'https://placehold.co/800x600',
    link: '/nl/boeken'
  },
  {
    title: 'Energetisch werk',
    description: `Herstel je natuurlijke energiebalans door subtiel energetisch werk. Deze sessies helpen bij het 
    oplossen van blokkades en het hervinden van je innerlijke kracht.`,
    image: 'https://placehold.co/800x600',
    link: '/nl/boeken'
  },
  {
    title: 'NLP en hypnose',
    description: `Transformeer belemmerende gedachtepatronen en overtuigingen met NLP en hypnose. Deze technieken 
    helpen je om positieve veranderingen in je leven te creëren.`,
    image: 'https://placehold.co/800x600',
    link: '/nl/boeken'
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-20 bg-stone-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-light mb-6 text-stone-800">
            Mijn diensten
          </h1>
          <p className="text-lg text-stone-600">
            Ontdek hoe ik je kan helpen om meer balans, rust en vitaliteit in je leven te brengen
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-light mb-4 text-stone-800">
                  {service.title}
                </h2>
                <p className="text-stone-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  href={service.link}
                  className="inline-block bg-stone-800 text-white px-6 py-2 rounded-full 
                  hover:bg-stone-700 transition-colors"
                >
                  Boek een sessie
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 