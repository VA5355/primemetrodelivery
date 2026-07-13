import React from "react";
import Image from "next/image";
import logo from "../images/logo.png";
import deliverymin from '../../public/logo_square_dark.png'
import primecomputersmall from '../../public/logo_dark_small.png'
import primecomputertext from '../../public/primelog.png'
const Footer =() =>{
    return (
    <div className="w-full h-20 bg-amazon_light text-gray-400 flex items-center justify-center gap-4">
        <Image className="w-16" src={primecomputersmall.src} alt="Logo"  width={35}
      height={25}/> <Image className="w-48 px-4 object-cover "  src={primecomputertext.src}  width={150}
      height={103} alt="logoImg"/> 
        <p className="text-sm -mt-4">
            All rights reserved {" "}
            <a className="hover:text-white hoverunderline decoration-[1px]
            cursor-pointer duration-250" href="https://storenotify.in" target="_blank">
            @storenotify.in</a></p>
    </div>
    );
};

export default Footer;