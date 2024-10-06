import React from 'react'
import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const FloatingActionButton = () => {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <Link to="/create-memorial">
        <motion.button
          className="bg-forever-orange text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </Link>
    </motion.div>
  )
}

export default FloatingActionButton