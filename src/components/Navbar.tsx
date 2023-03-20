import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
    function handleSignOut() {
        signOut();
    }

    return (
        <nav className='relative flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-sm hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start'>
            <ul className='flex gap-3 pl-5'>
                <li>
                <Link href='/'>Home</Link>
                </li>
                <li>
                    <button
                        type='button'
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </button>
                </li>

            </ul>
        </nav>
    )
}
