'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <div className="bg-[#2C2C2C] text-[#E4E4E4] py-20 flex items-center px-6 md:px-20 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full items-center">
        {/* Teks */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 z-10 text-left max-w-xl"
        >
          <h1 className="text-4xl text-[#FFC1CC] md:text-6xl font-bold leading-snug md:leading-tight tracking-tight">
            Temukan Gaya Unikmu
          </h1>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed md:leading-loose">
            Koleksi pakaian minimalis dan retro yang dirancang untuk kenyamanan dan gaya modern sehari-hari. Mulai dari hoodie, kaos, hingga aksesoris—semuanya dirancang dengan detail dan rasa.
          </p>
          <div className="flex justify-start mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200 transition text-base md:text-lg font-medium shadow-md"
            >
              Belanja Sekarang
            </motion.button>
          </div>
        </motion.div>

        {/* Gambar Slider */}
        <div className="w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-lg">
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            autoplay={{ delay: 3000 }}
            effect="fade"
            pagination={{ clickable: true }}
            loop
            className="h-full"
          >
            {['/images/3.png', '/images/5.png', '/images/6.png'].map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Slide ${index}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
