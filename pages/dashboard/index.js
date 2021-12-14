import Navbar from '@components/navbar'
import Metatags from '@components/metatags'
import {UserContext} from '@lib/UserContext'
import {useContext} from 'react';


export default function Dashboard() {
   const { user, username } = useContext(UserContext);
   return (
      <>
         <Metatags title= {"Dashboard  | " + username}/>
         <Navbar/>
      </>
   )
}