export default function AuthLayout({children}: {children: React.ReactNode}) {
    return (
        <div className='flex items-center h-screen bg-white'>
            {children}
        </div>
    )
}
