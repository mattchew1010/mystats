import Navbar from '@components/navbar'
import Metatags from '@components/metatags'
import {userContext} from '@lib/UserContext'
import {useContext} from 'react';


export default function Dashboard() {
   const { user, username } = useContext(userContext);
   return (
      <>
         <Metatags title= {"Dashboard  | " + username}/>
         <Navbar/>
      </>
   )
}