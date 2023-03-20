export default function AppLayout({children}: {children: React.ReactNode}) {
    return (
        <div className='flex h-screen bg-white'>
            {children}
        </div>
    )
}