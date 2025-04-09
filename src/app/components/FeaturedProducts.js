'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useCart } from '@/app/context/CartContext'
import products from '@/app/data/products.json'
import { toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

export default function FeaturedProducts() {
  const { addToCart } = useCart()
  const [popupProduk, setPopupProduk] = useState(null)
  const [selectedUkuran, setSelectedUkuran] = useState('')

  const handleAdd = (product) => {
    if (!selectedUkuran) {
      toast.error('Pilih ukuran terlebih dahulu')
      return
    }
    addToCart({ ...product, ukuran: selectedUkuran })
    toast.success(`${product.nama} ditambahkan ke keranjang!`)
    setPopupProduk(null)
    setSelectedUkuran('')
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="bg-[#2C2C2C] text-[#E4E4E4] py-20 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#FFC1CC]">
        Produk Unggulan Kami yang lagi diskon
      </h2>
      <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
        Pilihan terbaik dengan kualitas dan gaya terbaik, langsung dari koleksi terbaru kami.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products
          .filter((p) => p.diskonPersen)
          .map((item, i) => {
            const hargaDiskon = Math.floor(item.harga * (1 - item.diskonPersen / 100))

            return (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={() => setPopupProduk(item)}
                className="relative bg-[#3B3B3B] rounded-2xl overflow-hidden shadow-md transition duration-300 cursor-pointer"
              >
                {/* Badge Diskon */}
                {item.diskonPersen && (
                  <span className="absolute top-3 left-3 z-10 bg-[#FFC1CC] text-black text-xs font-semibold px-3 py-1 rounded-full">
                    -{item.diskonPersen}%
                  </span>
                )}

                <Image
                  src={item.gambar}
                  alt={item.nama}
                  width={500}
                  height={500}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <div className="p-5 text-center space-y-2">
                  <h3 className="text-xl font-semibold">{item.nama}</h3>
                  <div className="text-sm text-gray-400 line-through">
                    Rp {item.harga.toLocaleString('id-ID')}
                  </div>
                  <p className="text-[#FFC1CC] font-medium text-lg">
                    Rp {hargaDiskon.toLocaleString('id-ID')}
                  </p>
                  <p className="text-sm text-[#FFC1CC]">Klik untuk detail</p>
                </div>
              </motion.div>
            )
          })}
      </div>

      {/* POPUP DETAIL */}
      <AnimatePresence>
        {popupProduk && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center px-4"
            onClick={() => setPopupProduk(null)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#3B3B3B] p-6 rounded-2xl max-w-4xl w-full flex flex-col md:flex-row gap-6 relative"
            >
              {/* Badge Diskon di Popup */}
              {popupProduk.diskonPersen && (
                <span className="absolute top-4 left-4 bg-[#FFC1CC] text-black text-xs font-semibold px-3 py-1 rounded-full z-20">
                  -{popupProduk.diskonPersen}%
                </span>
              )}

              <img
                src={popupProduk.gambar}
                alt={popupProduk.nama}
                className="w-full md:w-1/2 h-80 object-cover rounded-xl"
              />
              <div className="flex-1 text-[#E4E4E4]">
                <h2 className="text-2xl font-bold mb-2 text-[#FFC1CC]">{popupProduk.nama}</h2>
                <p className="mb-4 text-sm text-gray-400">
                  {popupProduk.deskripsi || 'Deskripsi belum tersedia.'}
                </p>
                <p className="mb-6 font-semibold text-lg">
                  <span className="line-through mr-2 text-gray-500">
                    Rp {popupProduk.harga.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[#FFC1CC]">
                    Rp {Math.floor(popupProduk.harga * (1 - popupProduk.diskonPersen / 100)).toLocaleString('id-ID')}
                  </span>
                </p>

                {/* Ukuran */}
                <div className="mb-6">
                  <label className="block mb-2 font-semibold">Pilih Ukuran</label>
                  <div className="flex flex-wrap gap-3">
                    {['S', 'M', 'L', 'XL'].map((uk) => (
                      <button
                        key={uk}
                        onClick={() => setSelectedUkuran(uk)}
                        className={`px-4 py-2 rounded-full font-medium border transition text-sm
                          ${
                            selectedUkuran === uk
                              ? 'bg-[#FFC1CC] text-black border-[#FFC1CC]'
                              : 'bg-[#2C2C2C] text-[#E4E4E4] border-gray-500 hover:bg-[#444]'
                          }`}
                      >
                        {uk}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleAdd(popupProduk)}
                  className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition"
                >
                  Tambahkan ke Keranjang
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
