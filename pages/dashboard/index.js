import Navbar from 'components/navbar'
import Metatags from '@components/metatags'
import { useSession} from "next-auth/react"
import { useRouter } from 'next/router'

export default function Dashboard() {
   const { data: session } = useSession()
   if (!session) useRouter().push('/login')

   return (
      <>
         <Metatags title= {"Dashboard  | " + session.user.name}/>
         <Navbar/>
      </>
   )
}
