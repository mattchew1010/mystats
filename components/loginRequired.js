import Link from 'next/link';

export default function Navbar() {
  return (
     <>
         <h1 style={{textAlign:"center"}}>Not Logged In</h1>
         <p>Please </p>
         <Link href="/login">
            <p>Login</p>
         </Link>
      </>
   )
}
