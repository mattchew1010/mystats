import Metatags from '@components/metatags';
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/router'
import { GoogleLoginButton } from "react-social-login-buttons";

export default function Enter() {
  const { data: session } = useSession()
  const router = useRouter()
  if (session) router.push('/dashboard')
  return (
    <main>
      <Metatags title="Login" description="Login and sign up page" />
      <div style={{margin:'auto', display: 'flex',  justifyContent:'center', alignItems:'center', width: '16em', height: '75vh'}}>
        <GoogleLoginButton onClick={() => signIn("google", { callbackUrl: '/dashboard'})}/>
      </div>
      
    </main>
  );
}