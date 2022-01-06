import Navbar from '@components/navbar.js'
import Metatags from '@components/metatags.js'
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