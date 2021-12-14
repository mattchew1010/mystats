import Link from 'next/link';
import { UserContext } from '@lib/UserContext';
import {useContext } from 'react';
import { auth } from '@lib/firebase';


export default function Navbar() {
  const { user, username } = useContext(UserContext);
   return (
     <nav className="navbar">
       <ul>
         <li>
           <Link href="/">
             <button className="btn-logo">SITE_NAME</button>
           </Link>
         </li>
         <li>
           <Link href="/dashboard">
             <button className="btn-logo">Dashboard</button>
           </Link>
         </li>
           {user ? <Logout/> : <Login/>}
       </ul>
     </nav>
   )
}


function Login() {
  return (
        <li>
          <Link href="/login">
            <button className="btn-blue">Log in</button>
          </Link>
        </li>
  )
}
function Logout() {
  return (
    <li>
        <button onClick={() => auth.signOut()}>Sign Out</button>;
    </li>
)
}