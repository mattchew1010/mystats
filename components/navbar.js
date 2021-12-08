import Link from 'next/link';

export default function Navbar() {
   return (
     <nav className="navbar">
       <ul>
         <li>
           <Link href="/">
             <button className="btn-logo">SITE_NAME</button>
           </Link>
         </li>
           <li>
             <Link href="/login">
               <button className="btn-blue">Log in</button>
             </Link>
           </li>
       </ul>
     </nav>
   )
}