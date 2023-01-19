import Link from "next/link";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BaseLayout = ({children}) => {
    return (
        <div className={'h-screen w-screen bg-gray-100 flex flex-col text-zinc-900 sm:overflow-clip overflow-y-auto'}>
            <ToastContainer/>
            <div className={"h-12 bg-white mb-8 shadow "}>
                <ul className={'flex h-full items-center mx-10 gap-5'}>
                    <li>
                        <Link href={'/admin'}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        Schools
                    </li>
                    <li>
                        Settings
                    </li>
                </ul>
            </div>
            <div className={"h-[calc(100%-5rem)] sm:w-2/3 w-full sm:mx-auto px-3 sm:px-0 flex flex-col lg:overflow-y-clip overflow-y-auto"}>
                {
                    children
                }
            </div>
        </div>
    )
}

export default BaseLayout