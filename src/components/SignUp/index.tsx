//import Container from '@/app/_components/container';
import LogoImage from '@/app/_components/logo-image-ecommerce';
import React from 'react';
import deliverymin from '../../../public/logo_square_dark.png'
 
import SignInForm from '../SignInForm';
import GadgetBanner from '../GadgetBanner';
const EcommerceCover = {

    title : "Prime Computers",
    coverImage : deliverymin.src
}
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      {children}
    </div>
  );
}


function SignUp(){

    return (
         <Container>
            
        
            <GadgetBanner/>



           {/**   <div className="mb-24 md:mb-24 sm:mx-0">*/} 
                 {/* Dynamic Delay Feedback Block 
                <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm flex items-start gap-4 mb-8">
          <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600 flex-shrink-0 shadow-inner">
            <LogoImage title={EcommerceCover.title} src={EcommerceCover.coverImage} />
          </div>
           <div className="space-y-1">
            <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider">
               + More than you'd ever imagine
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              The <code>Prime Computers</code>   is completely in active state . 
               Service that delivers 24*7.
            </p>
          </div> 
        </div>*/}
                <SignInForm/>
            {/**   </div>*/} 
         </Container>
    )
}

export default SignUp;
