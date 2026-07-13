import {useState, useEffect }  from "react";
import { Star, ShoppingCart, RefreshCw, AlertCircle, Info } from "lucide-react";
import HeaderBottom from "@/components/header/HeaderBottom";
import Header from "@/components/header/Header"
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import Products from "@/components/Products";
import {ProductProps} from "../../type"

interface Props{
  productData: ProductProps;
}

// Inline mock fallback image for instant rendering during API hiccups
const delivery = {
  src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f97316'><path d='M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12.5-3c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z'/></svg>"
};

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}


//{productData}: Props




export default function LegacyHome({ productData = [] }: { productData?: Product[] }) {
  const [retryProductData, setRetryProductData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
    const safeProducts = Array.isArray(productData) ? productData : [];
  
useEffect(() => {
    let alive = true;

    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }
        const productFetchData = await res.json();
        
        if (alive) {
          if (Array.isArray(productFetchData)) {
            setRetryProductData(productFetchData);
          } else {
            throw new Error("API did not return a valid product list array");
          }
          setIsLoading(false);
        }
      } catch (err: any) {
        console.error("Failed to compile product data:", err);
        if (alive) {
          setError(err.message);
          // Set safe fallback local backup so the page does not render an empty state
          setRetryProductData([
            {
              id: 101,
              title: 'Best Seller (Offline Cache Fallback)',
              price: 99,
              description: 'Establishing network link failed. Local backup caches activated.',
              category: 'Core Prime Service',
              image: delivery.src
            }
          ]);
          setIsLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      alive = false;
    };
  }, []);





  //console.log(productData);
  return (
            <div className="max-w-screen-2xl mx-auto">
        <Banner/>
        <div className="relative md:mt020 lgl:mt-32 xl:mt-20 z-20 mb-10">
        <Products productData={safeProducts}/>
        </div>
      </div>
  );
}


export const getServerSideProps = async() =>{
  const res = await fetch("https://fakestoreapi.com/products")
  const productData = await res.json();
  return {props: {productData}};
}

/*
  <main>
      
      <div className="max-w-screen-2xl mx-auto">
        <Banner/>
        <div className="relative md:-mt020 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
        <Products productData={productData}/>
        </div>
      </div>
      
    </main>
--------------------------------------------------------------------------------------------------------------------

 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Latest Products</h2>
        <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full flex items-center gap-1">
          <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping"></span>
          Active Live Sync
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeProducts.map((product) => {
          const id = product?.id ?? Math.random();
          const title = product?.title ?? "Standard Product Details";
          const price = product?.price ?? 0;
          const image = typeof product?.image === 'string' ? product.image : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60";

          return (
            <div key={id} className="border border-gray-100 p-5 rounded-2xl hover:shadow-lg transition-all duration-300 flex flex-col justify-between group bg-white">
              <div className="relative overflow-hidden rounded-xl bg-gray-50 p-4 mb-4 flex items-center justify-center h-48">
                <img 
                  src={image} 
                  alt={title} 
                  className="max-h-36 max-w-full object-contain group-hover:scale-105 transition-transform duration-300" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60";
                  }}
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm line-clamp-1 group-hover:text-orange-600 transition-colors">{title}</h3>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2 min-h-[32px]">{product?.description ?? ""}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                  <span className="text-orange-600 font-extrabold text-base">?{price}</span>
                  <span className="text-[10px] bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded uppercase">
                    {product?.category ?? "General"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>





*/