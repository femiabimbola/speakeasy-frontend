import { Setup2fa } from "@/components/Setup2FA";
import { cookies } from 'next/headers';

const setup2FA =  async () => {

  const cookieStore = await cookies(); 
  const sessionToken = cookieStore.get('token')?.value;
  return ( 
  <Setup2fa   sessionToken={sessionToken}/>
)
}

export default setup2FA