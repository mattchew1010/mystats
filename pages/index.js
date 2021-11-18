import Image from 'next/image'


export default function Home() {
   return (
      <>
         <title>Home</title>
         <Image 
         src='/home/nick.jpg'
         alt="Picture of a cute mf"
         width="500"
         height="600"
         />

         <p>Nick kinda cute</p>
      </>
   )
}