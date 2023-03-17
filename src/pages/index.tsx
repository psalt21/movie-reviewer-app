import Head from 'next/head'
import Link from 'next/link'
import { getSession, useSession, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  function handleSignOut() {
    signOut();
  }
  
  return (
    <>
      <Head>
        <title>Movie Reviewer - Home</title>
      </Head>
      {session ? User({ session, handleSignOut }) : Guest()}
    </>
  )
}

// Guest
function Guest() {
  return (
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'>Guest Homepage</h3>

      <div className='flex justify-center'>
        <Link href={'/login'} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign In</Link>
      </div>
    </main>
  )
}

// Authorized User
function User({ session, handleSignOut }) {
  return (
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'>Authorized User Homepage</h3>

      <div className='details'>
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className='flex justify-center'>
        <button
          type='button'
          className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'
          onClick={handleSignOut}
          >
            Sign Out
          </button>
      </div>

      <div className='flex justify-center'>
        <Link href={'/profile'} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Profile Page</Link>
      </div>
    </main>
  )
}


export async function getServerSideProps ({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}