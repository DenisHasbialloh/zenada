'use client'

import { useState } from 'react'
import { useCart } from '@/app/context/CartContext'
import Navbar from '@/app/components/Navbar'
import products from '../data/products.json'
import { toast } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductPage() {
  const { addToCart } = useCart()
  const [kategoriAktif, setKategoriAktif] = useState('semua')
  const [popupProduk, setPopupProduk] = useState(null)
  const [selectedUkuran, setSelectedUkuran] = useState('')

  const kategoriTersedia = ['semua', 'hoodie', 'kaos', 'sweater']

  const hitungHargaDiskon = (harga, diskon) => {
    return Math.floor(harga * (1 - diskon / 100))
  }

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

  const produkDitampilkan = [...products]
    .filter((p) => (kategoriAktif === 'semua' ? true : p.kategori === kategoriAktif))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <>
      <Navbar />
      <div className="bg-[#2C2C2C] min-h-screen text-[#E4E4E4] px-6 md:px-20 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#FFC1CC] mb-4">Semua Produk</h1>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
            Jelajahi koleksi produk kami berdasarkan kategori pilihanmu.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {kategoriTersedia.map((kategori) => (
            <button
              key={kategori}
              onClick={() => setKategoriAktif(kategori)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                kategoriAktif === kategori
                  ? 'bg-[#FFC1CC] text-black'
                  : 'bg-[#3B3B3B] text-gray-300 hover:bg-[#505050]'
              }`}
            >
              {kategori.charAt(0).toUpperCase() + kategori.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {produkDitampilkan.map((product) => {
            const hargaDiskon = product.diskonPersen
              ? hitungHargaDiskon(product.harga, product.diskonPersen)
              : null

            return (
              <motion.div
                key={product.id}
                onClick={() => setPopupProduk(product)}
                whileHover={{ scale: 1.03 }}
                className="bg-[#3B3B3B] p-6 rounded-2xl flex flex-col items-center shadow-md hover:shadow-lg transition relative cursor-pointer"
              >
                <img
                  src={product.gambar}
                  alt={product.nama}
                  className="w-full h-64 object-cover rounded-xl mb-4"
                />
                {product.diskonPersen && (
                  <div className="absolute top-4 left-4 bg-[#FFC1CC] text-black px-3 py-1 text-xs font-semibold rounded-full shadow">
                    -{product.diskonPersen}%
                  </div>
                )}
                <h2 className="text-xl font-semibold mb-2 text-center">{product.nama}</h2>
                <p className="text-gray-300 mb-4 text-sm">
                  {hargaDiskon ? (
                    <>
                      <span className="line-through mr-2 text-gray-500">
                        Rp {product.harga.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[#FFC1CC] font-semibold">
                        Rp {hargaDiskon.toLocaleString('id-ID')}
                      </span>
                    </>
                  ) : (
                    <>Rp {product.harga.toLocaleString('id-ID')}</>
                  )}
                </p>
                <p className="text-sm text-[#FFC1CC]">Klik untuk detail</p>
              </motion.div>
            )
          })}
        </div>

        <AnimatePresence>
  {popupProduk && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      onClick={() => setPopupProduk(null)}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#3B3B3B] p-6 rounded-3xl max-w-4xl w-full flex flex-col md:flex-row gap-6 shadow-xl border border-[#4A4A4A]"
      >
        {/* Tombol Close */}
        <button
          onClick={() => setPopupProduk(null)}
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl"
        >
          &times;
        </button>

        {/* Gambar Produk */}
        <img
          src={popupProduk.gambar}
          alt={popupProduk.nama}
          className="w-full md:w-1/2 h-80 object-cover rounded-2xl"
        />

        {/* Detail Produk */}
        <div className="flex-1 text-[#E4E4E4]">
          <h2 className="text-2xl font-bold mb-2 text-[#FFC1CC]">{popupProduk.nama}</h2>
          <p className="mb-4 text-sm text-gray-400">
            {popupProduk.deskripsi || 'Deskripsi belum tersedia.'}
          </p>

          <p className="mb-6 font-semibold text-lg">
            {popupProduk.diskonPersen ? (
              <>
                <span className="line-through mr-2 text-gray-500">
                  Rp {popupProduk.harga.toLocaleString('id-ID')}
                </span>
                <span className="text-[#FFC1CC]">
                  Rp {hitungHargaDiskon(popupProduk.harga, popupProduk.diskonPersen).toLocaleString('id-ID')}
                </span>
              </>
            ) : (
              <>Rp {popupProduk.harga.toLocaleString('id-ID')}</>
            )}
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

      </div>
    </>
  )
}
