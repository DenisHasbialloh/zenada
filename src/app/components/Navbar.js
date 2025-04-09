'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCart } from '@/app/context/CartContext';

export default function Navbar() {
  const pathname = usePathname();
  const { cart } = useCart();

  const totalQty = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  const menu = [
    { label: 'Home', href: '/' },
    { label: 'Produk', href: '/products' },
    { label: 'Checkout', href: '/checkout' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur bg-transparent text-[#E4E4E4] py-4">
      <div className="container mx-auto flex items-center justify-between px-6">
        <div className="flex-1" />
        <div className="text-xl font-bold text-center flex-1 text-[#FFC1CC]">ZENADA</div>

        <motion.ul
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex font-medium text-sm sm:text-base flex-1 justify-end"
        >
          {menu.map(({ label, href }) => {
            const isActive = pathname === href;
            const isCheckout = href === '/checkout';

            return (
              <li key={href} className="px-3 sm:px-4 relative">
                <Link href={href} className="relative group inline-block">
                  <span>{label}</span>

                  {/* Badge untuk Checkout */}
                  {isCheckout && totalQty > 0 && (
                    <span className="absolute -top-2 -right-3 bg-[#FFC1CC] text-black text-xs px-2 py-0.5 rounded-full font-semibold">
                      {totalQty}
                    </span>
                  )}

                  {/* Garis bawah animasi */}
                  <span
                    className={`
                      absolute bottom-0 right-0 h-[2px] bg-[#FFC1CC] transition-all duration-300
                      ${isActive
                        ? 'w-full origin-right'
                        : 'w-0 group-hover:w-full origin-right group-hover:origin-left'}
                    `}
                  />
                </Link>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </nav>
  );
}
