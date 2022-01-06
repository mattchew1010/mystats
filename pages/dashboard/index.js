import Navbar from 'components/navbar'
import Metatags from '@components/metatags'


export default function Dashboard() {
   return (
      <>
         <Metatags title= {"Dashboard  | " + username}/>
         <Navbar/>
      </>
   )
}