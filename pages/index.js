import Image from 'next/image'


export default function Home() {
   return (
      <>
         <title>Home</title>
         <Image 
         src='/Home/cert.png'
         alt="Picture of a cute mf"
         width="500"
         height="600"
         />

         <p>#1 best guy</p>
      </>
   )
}