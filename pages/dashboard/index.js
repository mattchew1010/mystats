import Navbar from '@components/navbar'
import Metatags from '@components/metatags'
import { useSession} from "next-auth/react"
import { useRouter } from 'next/router'

export default function Dashboard() {
   const { data: session } = useSession()
   const router = useRouter()
   if (!session) router.push('/login')

   return (
      <>
         <Metatags title= {"Dashboard  | " + session.user.name}/>
         <Navbar/>

         <h1>Welcome, {session.user.name}</h1>
      </>
   )
}
