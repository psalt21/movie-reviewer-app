import AppLayout from "@/components/AppLayout";
import { getSession } from "next-auth/react";

export default function Profile() {
    return (
        <AppLayout>
            <main className='container mx-auto text-center py-20'>
                <h3 className='text-4xl font-bold'>Profile Page</h3>
            </main>
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
