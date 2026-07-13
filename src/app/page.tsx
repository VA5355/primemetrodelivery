
"use client";
import React from "react";
import {useState, useEffect }  from "react";
//import Container from "@/app/_components/container";
import LegacyHome from "@/pages/home"; 
import { Star, ShoppingCart, RefreshCw, AlertCircle, Info } from "lucide-react";
//import HeaderBottom from "@/components/header/HeaderBottom";
//import Header from "@/components/header/Header"
//import Footer from "@/components/Footer";
//import Banner from "@/components/Banner";
//import Products from "@/components/Products";
 import {ProductProps} from "../../type"
import deliverymin from '../../public/minute_delivery.png'
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

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {children}
    </div>
  );
}


//{productData}: Props
export default function Home() {
    const [productData , setProductData ] = useState<Product[]>([]); 
    const [error, setError] = useState<string | null>(null);
      const [isLoading, setIsLoading] = useState<boolean>(true);
    /*useState<Product>([{ id:0,
    title:'Best Seller',
    price: 99,
    description:'Prime Delivery in Mins',
    category:'Top line for prime ',
    image: deliverymin.src}]);
    */
  useEffect(   () => {
    let alive = true;
    console.log("Ecommerce prime starting ");
     (async () => {
        try {
              const res = await fetch("https://fakestoreapi.com/products")
              const productFecthData = await res.json();
             setProductData(productFecthData);
              console.log(" fetched products  "+JSON.stringify(productData));
                setIsLoading(false);
        } catch (err: any) {
           console.error("Failed to compile product data:", err);
            if (alive) {
                setError(err.message);
                 // Set safe fallback local backup so the page does not render an empty state
                setProductData([
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
     })();
  
    
  
   }, []);
  
  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <Container>
        {/* Dynamic Delay Feedback Block 
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm flex items-start gap-4 mb-8">
          <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600 flex-shrink-0 shadow-inner">
            <Info size={18} />
          </div>
           <div className="space-y-1">
            <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider">
              Dynamic Render Delay Protection Enabled
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              The <code>LegacyHome</code> grid component is completely kept in a suspended state during initial load. 
              The page only renders the complete layout once the API resolves and validates the incoming data schema.
            </p>
          </div> 
        </div>
        */}
        {/* Error Fallback Notice */}
        {error && (
          <div className="bg-amber-50 border border-amber-200/50 rounded-2xl p-4 flex items-center justify-between text-xs text-amber-900 font-semibold shadow-sm mb-6 animate-pulse">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-600" />
              <span>Failed to fetch live database sync. Displaying system cached items.</span>
            </div>
          </div>
        )}

        <div className="relative z-20 mb-10">
          {/* Conditional rendering gate: Render shimmers while loading */}
          {isLoading ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 bg-gray-50/50 p-6 rounded-2xl border border-dashed border-gray-200 animate-pulse">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 h-96 flex flex-col justify-between">
                  <div className="h-44 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
                </div>
              ))}
            </div>
          ) : (
            // Securely render LegacyHome once loading is completely finished and productData is validated
            Array.isArray(productData) && productData.length > 0 && (
              <LegacyHome productData={productData} />
            )
          )}
        </div>
      </Container>
    </main>
  );
}

/*
export const getServerSideProps = async() =>{
  const res = await fetch("https://fakestoreapi.com/products")
  const productData = await res.json();
  return {props: {productData}};
}

 <main>
          <Container>
     <div className="max-w-screen-2xl mx-auto">
        <Banner/>  
        <div className="relative md:-mt020 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
        <LegacyHome  productData={productData}/>
        </div>
       </div>  
      </Container>
    </main>





*/