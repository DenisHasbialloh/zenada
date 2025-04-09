import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    nama: 'Rina A.',
    komentar: 'Kualitas bajunya bagus banget dan pengirimannya cepat!',
    foto: '/avatars/avatar1.jpg',
  },
  {
    id: 2,
    nama: 'Dewi S.',
    komentar: 'Desainnya keren dan nyaman dipakai. Pasti belanja lagi!',
    foto: '/avatars/avatar2.jpg',
  },
  {
    id: 3,
    nama: 'Andi P.',
    komentar: 'Pelayanan oke, respon cepat, dan barang sesuai ekspektasi.',
    foto: '/avatars/avatar3.jpg',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ // Hapus ': number'
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

export default function TestimoniSection() {
  return (
    <section className="bg-[#1F1F1F] text-[#E4E4E4] py-20 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-[#FFC1CC] mb-4">
        Apa Kata Mereka?
      </h2>
      <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
        Pelanggan kami sudah merasakan kualitas produk dan layanan kami.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {testimonials.map((item, i) => (
          <motion.div
            key={item.id}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-[#3B3B3B] p-6 rounded-2xl shadow-md space-y-4 text-center"
          >
            <Image
              src={item.foto}
              alt={item.nama}
              width={80}
              height={80}
              className="rounded-full mx-auto object-cover"
            />
            <p className="text-gray-300 text-sm italic">"{item.komentar}"</p>
            <h4 className="font-semibold text-[#FFC1CC]">{item.nama}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
}