"use client";
import logo from "../../images/logo.png"
import deliverymin from '../../../public/logo_square_dark.png'
//import primecomputertitle from '../../../public/logo_dark_title.png'
// works locally fails netlify deployed 
//import primecomputerheader from '../../../public/logo_dark_header.png'
//import primecomputertext from '../../../public/primelog.png'
//import fallbackusergooglesign from '../../../public/fallback-user-google-sign-image.png'
// Import directly from your public folder path
import primecomputerheader from "@/public/logo_dark_header.png"; 
import primecomputertext from "@/public/primelog.png";
import Image from "next/image"
import cartIcon from "../../images/cart.png";
import { BiCaretDown } from "react-icons/bi";
import { HiOutlineSearch } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { stateProps } from "../../../type";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect , useState } from "react";
import { addUser } from "@/store/nextSlice";
import { SessionProvider } from "next-auth/react";
import HappyCustomerLogo from "../HappyCustomerLogo";

export function checkImageExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
const Header = () => {
    const { data: session } = useSession();
   // const primecomputerheader = "/logo_dark_header.png";
   // const primecomputertext = "/primelog.png";
    const [userValidImg, setUserValidImg] = useState(false);
     const router = useRouter();
    const {productData,favoriteData, userInfo} = useSelector(
        (state:stateProps)=>state.next);
        const dispatch = useDispatch()
        console.log(userInfo)
    useEffect(()=>{
        if(session){
            dispatch(addUser({
                name:session?.user?.name,
                email:session?.user?.email,
                image:session?.user?.image,


            })
        );
             if(userInfo){
                // Usage inside a React useEffect or event handler:
                        checkImageExists(userInfo.image).then((isValid) => {
                        if (isValid) {
                            console.log('Image exists and loaded perfectly.');
                            setUserValidImg(true)
                        }
                        });
        
                }



        }
    },[session]);

    const handleNavigation = () => {
    // Perform any custom logic here (e.g., analytics, state updates)
    router.push("/login"); 
  };

    return (
    <div className="w-full h-20 bg-amazon_blue text-lightText sticky top-0 z-50"> 
        <div className="h-full w-full mx-auto inline-flex items-center justify-between gap-1 mdl:gap-3 px-4 ">
            {/* logo */}
            <Link href={"/"} className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 flex items-center justify-center h-[70%]">
            <Image className="w-16 object-cover "  src={primecomputerheader.src }  width={60}
      height={63} alt="logoImg"/>  <Image className="w-48 px-4 object-cover "  src={primecomputertext.src}  width={150}
      height={103} alt="logoImg"/> 
            </Link>
            {/* delivery */}
            <div className="px-2 border border-transparent hover:border-white cursor-pointer duration-300 items-center justify-center h-[70%] hidden xl:inline-flex gap-1">
          <SlLocationPin />
          <div className="text-xs">
            <p>Deliver to</p>
            <p className="text-white font-bold uppercase">India</p>
          </div>
        </div>
            {/* searchbar */}
            <div className="flex-1 h-10 hidden md:inline-flex items-center justify-between relative ">
                <input className="w-full h-full rounded-md px-2 placeholder:text-sm text-base text-black border-[3px] border-transparent outline-none
                focus-visible:border-amazon_yellow" type="text" placeholder="Search products"/>
                <span className="w-12 h-full bg-amazon_yellow text-black text-2xl flex
                items-center justify-center absolute right-0 rounded-md rounded-br-md">
                    <HiOutlineSearch/>
                </span>
            </div>
            {/* signin */}
            {
                userInfo?<div 
                 className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1">
                   {userValidImg? <img src={userInfo.image} alt="userImage"
                    className="w-8 h-8 rounded-full object-cover"/> : <HappyCustomerLogo/>} 
                    {/**<img src={fallbackusergooglesign.src} alt="userImage"
                    className="w-8 h-8 rounded-full object-cover"/> */}
                    <div className="text-xs text-gray-100 flec flex-col
                    justify-between">
                        <p className="text-white font-bold">{userInfo.name}</p>
                        <p>{userInfo.email}</p>
                    </div>
                </div>:<div onClick={()=> handleNavigation()} className="text-xs text-gray-100 flex flex-col justify-center px-2 border
            border-transparent hover:border-white cursor-pointer duration-300 h-[70%]">
                <p>Hello, sign in</p>
                <p className="text-white font-bold flex">Account & Lists{" "}<span>
                    <BiCaretDown/></span></p>
            </div>
            }
            {/* favorite */}
            <div className="text-xs text-gray-100 flex flex-col justify-center px-2 border
            border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative">
                <p>Marked</p>
                <p className="=text-white font-bold">& Favorite</p>
                {
                    favoriteData.length > 0 && (
                        <span className="absolute right-2 top-2 w-4 h-4
                        border-[1px] border-gray-400 flex items-center justify-center text-xs
                        text-amazon_yellow">{favoriteData.length}</span>
                    )
                }
                </div>
            {/* cart */}
            <Link href={"/cart"} className="flex items-center px-2  border
            border-transparent hover:border-white cursor-pointer duration-300 h-[70%] relative">
                <Image className="w-auto object-cover h-8" src={cartIcon} alt="cartImg"/>
                <p className="text-xs text-white font-bold mt-3">Cart</p>
                <span className="absolute text-amazon_yellow text-sm top-2 left-[29px] font-semibold">
                    {productData ? productData.length: 0}
                </span>
            </Link>
        </div>
    </div>
    );
};

export default Header;
