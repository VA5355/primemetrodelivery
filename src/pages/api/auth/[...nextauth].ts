import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks:{
    async redirect( params:{ url: string, baseUrl: string }  )   {
       // allow relative callback URLS 
       if(params.url.includes("/callback/google")) return "/";
       if(!params.url.includes("/")) return "/login";
      return params.url;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
});
