import Link from "next/link";

const  Home = () => {

  return ( 
    <div className="flex flex-col justify-center items-center h-screen gap-y-3">
      <h1 className="text-3xl font-bold text-white"> A 2 Factor Authentication</h1>
      <p className="text-white pb-3">A Two Factor Authentication with Speakeasy and Jsonwebtoken</p>
      <div className="flex gap-x-8">
      <Link href={'/login'} className="px-8 py-2.5 rounded-sm bg-blue-600 text-white cursor-pointer"> Login  </Link>
      <Link href={'/register'} className="px-8 py-2.5 rounded-sm bg-blue-600 text-white cursor-pointer"> Register  </Link>
      </div>
      
    </div>
    
  );
}

export default Home
