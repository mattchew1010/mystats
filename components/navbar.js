import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"


export default function Navbar() {
  const { data: session } = useSession()

  return (
     <nav className="navbar">
       <ul>
         <li>
           <Link href="/">
             <button className="btn-logo">mattchew1010</button>
           </Link>
         </li>
         <li>
           <Link href="/dashboard">
             <button className="btn-logo">Dashboard</button>
           </Link>
         </li>
           {session ? <Logout/> : <Login/>}
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
        <button onClick={() => signOut()}/>;
    </li>
)
}
