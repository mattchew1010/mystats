import '@styles/globals.css'
import { UserContext } from '@lib/UserContext';
import { useUserData } from '@lib/hooks';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
  <UserContext.Provider value={userData}>
    <Component {...pageProps} />
  </UserContext.Provider> 
  )
}

export default MyApp
