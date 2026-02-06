import { Outlet } from 'react-router'
import Navbar from '../components/shared/Navbar/Navbar'
import Footer from '../components/shared/Footer/Footer'

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-app-bg text-app-text transition-colors duration-300  ">


            <header className="w-full  border-gray-100 dark:border-brand-primary/20 fixed z-50">
                <div className="max-w-xxl mx-auto  ">
                    <Navbar />
                </div>
            </header>

            <main className="flex-grow w-full">
                <div className="max-w-xxl mx-auto   ">
                    <Outlet />
                </div>
            </main>

            <footer className="w-full   border-gray-100 dark:border-brand-primary/20">
                <div className="max-w-xxl mx-auto  ">
                    <Footer />
                </div>
            </footer>
        </div>
    )
}