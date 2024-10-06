import React from 'react'
import { motion } from 'framer-motion'

const SampleMemorial = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-forever-purple dark:text-forever-light mb-12">Sample Memorial</h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-forever-light dark:bg-gray-700 p-8 rounded-lg shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <img
                src="https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=300&q=80"
                alt="John Doe"
                className="rounded-full w-48 h-48 object-cover mx-auto"
              />
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h3 className="text-3xl font-semibold text-forever-purple dark:text-forever-light mb-4">John Doe</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">1950 - 2022</p>
              <p className="text-gray-700 dark:text-gray-200 mb-6">
                John Doe was a beloved father, husband, and community leader. His kindness and wisdom touched the lives of many, and his legacy continues to inspire us all.
              </p>
              <button className="bg-forever-purple text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition duration-300">
                View Full Memorial
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SampleMemorial