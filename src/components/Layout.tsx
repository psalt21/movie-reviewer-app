import styles from '@/styles/Layout.module.css';

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex items-center h-screen bg-white">
            {children}
        </div>
    )
}
