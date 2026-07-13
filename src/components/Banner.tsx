import React, { useState, useEffect } from "react";

const SLIDES = [
    {
    id: 1,
    title: "Up to 60% off",
    desc: "The Premium Edit",
    tag: "Sponsored Discovery",
    gradient: "bg-gradient-to-b from-orange-950/20 to-transparent",  // from-blue-900 via-indigo-950 to-zinc-950
    icon: (
     <img alt="op" src="https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/Premium_Edit_BAU_GW._CB783723050_.jpg" height="100%" width="1500px" data-a-hires="https://images-eu.ssl-images-amazon.com/images/G/31/INSLGW/Premium_Edit_BAU_GW._CB783723050_.jpg"/> 
    )
  },
  /*{
    id: 1,
    title: "Supercharge Your Multi-Cloud Dev",
    desc: "LocalStack & GCP Emulators on ultra-fast NVMe storage.",
    tag: "Sponsored Discovery",
    gradient: "from-blue-900 via-indigo-950 to-zinc-950",
    icon: (
      <svg className="w-24 h-24 text-blue-400 opacity-85" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },*/
  {
    id: 2,
    title: "Great Indian Festival Starts Early",
    desc: "Up to 40% off on premium developer rigs.",
    tag: "Exclusive Offer",
    gradient: "bg-gradient-to-b from-orange-950/20 to-transparent", // from-orange-950 via-amber-900 to-zinc-950
    icon: (
      <svg className="w-24 h-24 text-amber-400 opacity-85" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  },

 {
    id: 3,
    title: "Snack Smart with dry fruits ",
    desc: "Up to 45% off.",
    tag: "Developer Resource",
    gradient: "bg-gradient-to-b from-orange-950/20 to-transparent",//from-zinc-900 via-zinc-950 to-black
    icon: (
     <img alt="MA levis" src="https://images-eu.ssl-images-amazon.com/images/G/31/img24/Fresh/GW/July26/9July/WD/12th_GW_PC1x_Hero_Dry-fruits_2._CB757240985_.jpg" height="100%" width="3000px" data-a-hires="https://images-eu.ssl-images-amazon.com/images/G/31/img24/Fresh/GW/July26/9July/WD/12th_GW_PC1x_Hero_Dry-fruits_2._CB757240985_.jpg"/> 
    )
  },
  
 /* {
    id: 3,
    title: "Next.js 14 Production Optimized",
    desc: "Fast rendering with clean Redux Persist integrations.",
    tag: "Developer Resource",
    gradient: "from-zinc-900 via-zinc-950 to-black",
    icon: (
      <svg className="w-24 h-24 text-teal-400 opacity-85" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },*/
  {
    id: 4,
    title: "Signature Flash-Fry Street Food",
    desc: "Get fresh torched veggies and paneer delivered in Pune.",
    tag: "Freshly Prepared",
    gradient: "bg-gradient-to-b from-orange-950/20 to-transparent", //from-rose-950 via-red-900 to-zinc-950
    icon: (
      <svg className="w-24 h-24 text-rose-400 opacity-85" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      </svg>
    )
  }
];

/**
 * Custom High-Fidelity Banner Slideshow Component.
 * Engineered to avoid external carousel libraries and relative static image bindings,
 * completely resolving workspace and environment compile failures.
 */
const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <div className="relative h-[240px] md:h-[400px] w-full overflow-hidden bg-zinc-950">
      {/* Slides Viewport */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      > {/** bg-gradient-to-r */}
        {SLIDES.map((slide) => (
          <div 
            key={slide.id} 
            className={`w-full h-full flex-shrink-0  ${slide.gradient} flex items-center justify-between px-8 md:px-24 text-white relative`}
          >
            {/* Left Content Area */}
            <div className="flex flex-col justify-center max-w-xl z-10">
              <span className="text-amber-500 font-bold uppercase text-[10px] md:text-xs tracking-widest mb-1">
                {slide.tag}
              </span>
              <h1 className="text-xl md:text-5xl font-extrabold tracking-tight leading-tight">
                {slide.title}
              </h1>
              <p className="text-xs md:text-lg text-zinc-300 mt-2 max-w-md">
                {slide.desc}
              </p>
              <button className="mt-4 bg-amber-500 hover:bg-amber-600 text-black text-[10px] md:text-sm font-bold py-2 px-5 md:px-6 rounded-lg w-fit transition-all shadow-lg shadow-amber-500/10 active:scale-95">
                Explore Now
              </button>
            </div>

            {/* Right Graphic Area */}
            <div className="hidden sm:flex items-center justify-center p-4 z-10">
              {slide.icon}
            </div>

            {/* Ambient Background Watermark */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Slide Navigation Controls */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white backdrop-blur-sm transition-all z-30"
        aria-label="Previous Slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white backdrop-blur-sm transition-all z-30"
        aria-label="Next Slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Decorative Bottom Fade Effect bg-gradient-to-t from-gray-300 to-transparent*/}
      <div className="absolute bottom-0 left-0 right-0 h-20  pointer-events-none z-20" />
    </div>
  );
};

export default Banner;