'use client';

import { useCart } from '@/app/context/CartContext';
import Navbar from '@/app/components/Navbar';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, removeFromCart, clearCart, updateQty } = useCart(); // pastikan ada updateQty di context
  const router = useRouter();

  const hitungHargaDiskon = (harga, diskonPersen) => {
    return Math.floor(harga * (1 - diskonPersen / 100));
  };

  const total = cart.reduce((sum, item) => {
    const hargaAkhir = item.diskonPersen
      ? hitungHargaDiskon(item.harga, item.diskonPersen)
      : item.harga;
    return sum + hargaAkhir * (item.qty || 1);
  }, 0);

  const handleCheckout = () => {
    alert('Checkout berhasil! Terima kasih sudah berbelanja 😊');
    clearCart();
    router.push('/products');
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#2C2C2C] min-h-screen text-[#E4E4E4] px-6 md:px-20 py-24">
        <h1 className="text-3xl font-bold mb-8 text-[#FFC1CC]">Checkout</h1>

        {cart.length === 0 ? (
          <p className="text-gray-400">Keranjang kamu kosong.</p>
        ) : (
          <div className="flex flex-col gap-6">
            {cart.map((item) => {
              const hargaDiskon = item.diskonPersen
                ? hitungHargaDiskon(item.harga, item.diskonPersen)
                : null;
              const qty = item.qty || 1;

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-[#3B3B3B] p-6 rounded-2xl shadow-md"
                >
                  <div className="flex items-center gap-6">
                    <img
                      src={item.gambar}
                      alt={item.nama}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{item.nama}</h2>
                      <p className="text-gray-400 text-sm mt-1">
                        {hargaDiskon ? (
                          <>
                            <span className="line-through mr-2 text-gray-500">
                              Rp {item.harga.toLocaleString('id-ID')}
                            </span>
                            <span className="text-[#FFC1CC] font-semibold">
                              Rp {hargaDiskon.toLocaleString('id-ID')}
                            </span>
                          </>
                        ) : (
                          <>Rp {item.harga.toLocaleString('id-ID')}</>
                        )}
                      </p>

                      {/* Kontrol Qty */}
                      <div className="flex items-center mt-2 gap-3">
                        <button
                          onClick={() =>
                            updateQty(item.id, Math.max(1, qty - 1))
                          }
                          className="px-3 py-1 rounded-full bg-gray-600 hover:bg-gray-500 text-white"
                        >
                          -
                        </button>
                        <span className="text-white">{qty}</span>
                        <button
                          onClick={() => updateQty(item.id, qty + 1)}
                          className="px-3 py-1 rounded-full bg-gray-600 hover:bg-gray-500 text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-medium"
                  >
                    Hapus
                  </button>
                </div>
              );
            })}

            <div className="text-right mt-10 border-t border-gray-600 pt-6">
              <p className="text-xl font-semibold mb-4">
                Total: Rp {total.toLocaleString('id-ID')}
              </p>
              <button
                onClick={handleCheckout}
                className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
