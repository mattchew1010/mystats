import Link from 'next/link';

export default function Home() {
   return (
         <nav className="navbar">
            <ul>
               <li>
                  <Link href="/">
                     <button className="btn-logo">FEED</button>
                  </Link>
               </li>
            </ul>
         </nav>

   )
}