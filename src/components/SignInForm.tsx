import LogoImage from '@/app/_components/logo-image-ecommerce';
import React, { useState } from 'react';
//import deliverymin from '../../public/logo_square_dark.png'
// import deliverymin from '../../public/logo_square_dark.png'
 import logosquaredark from "@/public/logo_square_dark.png";
//import fallbackusergooglesign from '../../public/fallback-user-google-sign-image.png'
import { useSession, signIn, signOut } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { stateProps } from "../../type";
import { addUser } from "@/store/nextSlice";
import Link from 'next/link';
import HappyCustomerLogo from './HappyCustomerLogo';
const EcommerceCover = {

    title : "Prime Computers",
    coverImage : logosquaredark.src
}
export function checkImageExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}


export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [userValidImg, setUserValidImg] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
        const {productData,favoriteData, userInfo} = useSelector(
            (state:stateProps)=>state.next);
            const dispatch = useDispatch()

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
  // Simple email validation helper
  const validateEmail = (input :any ) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleSubmit = async (e :any ) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email address is required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Trigger loading state and mock API call
    setIsLoading(true);
    try {
      // Simulate API request delay
     // await new Promise((resolve) => setTimeout(resolve, 1500));
        await signIn();

      console.log('Signing in with:', email);
    // alert(`Success! Magic link sent to ${email}`);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex  min-h-[80dvh] items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-2   ">
        {/** min-h-[calc(100vh-80px)]*/}
      {/* <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl border border-gray-100"> */}
           <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-sm flex items-start gap-4 mb-8">
          <div className="p-3  bg-amber-50 rounded-xl text-amber-600 flex-shrink-0 shadow-inner">
            <LogoImage title={EcommerceCover.title} src={EcommerceCover.coverImage} />
          </div>
           <div className="space-y-4">
            <h1 className="font-extrabold text-gray-900 text-3xl   ">
              {
                        userInfo?( <div>Welcome  </div>) : (<div className="  tracking-tight uppercase " >+ More than you'd ever imagine </div>)
               } </h1>
        {/* Header Text 
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We will send a magic link to your inbox.
          </p>
        </div>
*/}
            {/* Check User already logged in  */}
                    {
                        userInfo?<div 
                         className="flex items-center px-2 border border-transparent hover:border-white cursor-pointer duration-300 h-[70%] gap-1">
                           {userValidImg?<img src={userInfo.image} alt="userImage" className="w-16 h-16 rounded-full object-cover"/> :
                             <HappyCustomerLogo/>
                           } 
                            {/** <img src={fallbackusergooglesign.src} alt="userImage" className="w-16 h-16 rounded-full object-cover"/>   */}
                            <div className="text-3xl bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100  rounded-2xl p-1 shadow-smflec flex-col
                            justify-between">
                                <p className="text-amazon_yellow font-bold">{userInfo.name}</p>
                                <p>{userInfo.email}</p>
                              
                            </div>  <div className='justify-end
                                 mx-auto flex '> <Link href="/">
                                <button className="w-48 h-10  bg-amazon_blue  text-amazon_yellow rounded-2xl   rounded-text-sm
                                font-semibold hover:bg-amazon_yellow hover:text-black">Go to Shopping</button>
                                </Link></div>
                        </div>: (
                          
                        <form className="mt-1 space-y-6" onSubmit={handleSubmit} noValidate>
                        <div>
                            <label 
                            htmlFor="email-address" 
                            className="block text-sm font-medium text-gray-700 mb-2"
                            >
                            Email address
                            </label>
                            <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            className={`block w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 ${
                                error 
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100'
                            }`}
                            />
                            {/* Error Message Box */}
                            {error && (
                            <p className="mt-2 text-sm text-red-600" id="email-error">
                                {error}
                            </p>
                            )}
                        </div>

                        {/* Action Button */}
                        <div>
                            <button
                            type="submit"
                            disabled={isLoading}
                            className={`flex w-full justify-center rounded-lg px-4 py-3 text-sm font-bold text-white shadow transition duration-150 ease-in-out ${
                                isLoading 
                                ? 'bg-indigo-400 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            }`}
                            >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                {/* Tailwind-only CSS Loading Spinner */}
                                <svg className="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Signing in...</span>
                                </div>
                            ) : (
                                'Sign in Google'
                            )}
                            </button>
                        </div>
                        </form> 

                        )
                    }

       
        <p className=" text-2xl font-bold text-gray-500  ">
               <span className="text-2xl font-black text-amazon_yellow tracking-tight leading-none ">
                 <code>Prime Computers</code>
                </span>&nbsp;
             at your door step. 
              <code>&nbsp; Dial Prime Computers @24*7 service.</code> 
            </p>
          </div> 
        </div>
     {/*  </div> space-y-8 rounded-2xl */}
    </div>
  );
}
