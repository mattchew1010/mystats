import Link from 'next/link';
import { UserContext } from '../../lib/UserContext';

function login() {
  return (
        <li>
          <Link href="/login">
            <button className="btn-blue">Log in</button>
          </Link>
        </li>
  )
}
function logout() {
  return (
    <li>
      <Link href="/logout">
        <button onClick={() => auth.signOut()}>Sign Out</button>;
      </Link>
    </li>
)
}
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
           {user ? <logout/> : <login/>}
       </ul>
     </nav>
   )
}