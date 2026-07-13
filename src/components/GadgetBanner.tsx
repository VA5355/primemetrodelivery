import React from 'react';
import { SparklesIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function GadgetBanner() {
  const [isVisible, setIsVisible] = React.useState(true);

 // if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-4 py-4.5 text-white flex justify-center items-center h-[62px] overflow-hidden text-xs font-semibold shadow-sm">
      <div className="flex items-center space-x-2 max-w-6xl w-full justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-2 truncate">
          <SparklesIcon className="h-4 w-4 text-yellow-300 animate-pulse flex-shrink-0" />
          <span className="truncate text-2xl">
            Mega Tech Sale: Up to 50% off on premium gadgets and smartwatches!
          </span>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 flex-shrink-0 text-2xl">
          <a
            href="#"
            className="underline hover:text-yellow-300 transition-colors duration-200"
          >
            Shop Now
          </a>
         {/*  <button
            onClick={() =>  }
            aria-label="Dismiss banner"
            className="p-1 rounded-full hover:bg-white/20 transition-colors duration-200"
          >
            <XMarkIcon className="h-3 w-3" />
          </button>*/}
        </div>
      </div>
    </div>
  );
}