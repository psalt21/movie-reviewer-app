import Navbar from "./Navbar";

export default function AppLayout({children}: {children: React.ReactNode}) {
    return (
        <>
        <Navbar />
        <div className='flex h-screen bg-white'>
            {children}
        </div>
        </>
    )
}