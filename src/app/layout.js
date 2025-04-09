// src/app/layout.js
import './globals.css';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Z.E.N.A.D.A',
  description: 'Belanja baju online',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-[#2C2C2C] text-[#E4E4E4]">
        <CartProvider>
          {children}
          <Toaster position="top-right" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
        </CartProvider>
      </body>
    </html>
  );
}
