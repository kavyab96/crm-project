
import { Outlet, } from 'react-router-dom'
import Navbar from '../components/Navbar'

const RouteLayout = () => {

    return (
        <div>
             <Navbar /> 
            <main className='w-[100%] h-screen dark:bg-gray-800  dark:text-white'>
                <Outlet />
            </main>
        </div>
    )
}

export default RouteLayout