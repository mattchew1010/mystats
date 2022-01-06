import Metatags from '@components/metatags';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'

export default function Enter() {
  const { data: session } = useSession()
  if (session) {
    useRouter().push('/dashboard')
  }
  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      <Metatags title="Login" description="Login and sign up page" />
      <SignInButton/>
    </main>
  );
}

// Sign in with Google button
function SignInButton() {
  return <button variant="primary" onClick={() => signIn()}/>;
}

// Sign out button
function SignOutButton() {
  return <button className="btn-logo" onClick={() => signOut()}/>;
}