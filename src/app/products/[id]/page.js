'use client'

import { useParams } from 'next/navigation'
import products from '@/app/data/products.json'
import Navbar from '@/app/components/Navbar'
import { useCart } from '@/app/context/CartContext'
import { toast } from 'react-hot-toast'

// Fungsi ini diperlukan untuk static export
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === parseInt(id))
  const { addToCart } = useCart()

  if (!product) {
    return <div className="text-center py-32">Produk tidak ditemukan</div>
  }

  const hargaDiskon = product.diskonPersen
    ? Math.floor(product.harga * (1 - product.diskonPersen / 100))
    : null

  const handleAdd = () => {
    addToCart(product)
    toast.success(`${product.nama} ditambahkan ke keranjang!`)
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#2C2C2C] text-[#E4E4E4] min-h-screen px-6 md:px-20 py-24">
        <div className="flex flex-col md:flex-row gap-12">
          <img
            src={product.gambar}
            alt={product.nama}
            className="w-full md:w-1/2 rounded-xl shadow-lg object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4 text-[#FFC1CC]">
              {product.nama}
            </h1>

            <p className="text-lg mb-4">
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

            <p className="text-gray-400 mb-6">
              Deskripsi produk bisa kamu tambahkan di sini. Bisa dibuat dinamis juga nanti.
            </p>

            <button
              onClick={handleAdd}
              className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
