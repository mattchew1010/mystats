import Image from 'next/image'
import nick from '../public/home/nick.jpg'


export default function Home() {
   return (
      <>
         <title>Home</title>
         <Image 
         src={nick}
         alt="Picture of a cute mf"
         width="500"
         height="600"
         />
      </>
   )
}