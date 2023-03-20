import AppLayout from "@/components/AppLayout";
import { getSession } from "next-auth/react";
import Link from "next/link";

export default function Profile() {
    return (
        <AppLayout>
            <section className='container mx-auto text-center'>
                <h3 className='text-4xl font-bold'>Profile Page</h3>

                <Link href={'/'} className='text-link'>Home Page</Link>
            </section>
        </AppLayout>
    )
}

export async function getServerSideProps({req}: any) {
    const session = await getSession({req});

    // unauthorized user should redirect to login page
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    // authorized user return session
    return {
        props: {session}
    }
}
