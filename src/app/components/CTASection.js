'use client'

import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="bg-[#1F1F1F] text-[#E4E4E4] py-20 px-6 md:px-20 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#FFC1CC]">
        Selamat Datang di Zenada
      </h2>
      <p className="text-gray-400 mb-8 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
        Temukan berbagai pilihan baju keren dan kekinian dengan harga terbaik.
        Belanja sekarang dan ekspresikan gayamu dengan Zenada!
      </p>
      <Link href="/products">
        <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition">
          Lihat Produk
        </button>
      </Link>
    </section>
  )
}
