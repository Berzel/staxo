import { Link, useForm, usePage } from "@inertiajs/inertia-react";
import { ClickAwayListener } from "@mui/material";
import { useState } from "react";

export default function TopNav() {
    const [ open, setOpen ] = useState(false);
    const { user } = usePage().props.auth;
    const { post } = useForm();

    function toggleOpen(event) {
        event.stopPropagation();
        setOpen(!open);
    }

    function logout(event) {
        event.preventDefault();
        post(route('logout'));
    }

    return (
        <nav className="flex items-center justify-between py-4 text-sm">
            <Link href={route('welcome')} className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-sky-500">

                </div>
                <h1 className="text-lg font-semibold">
                    Staxo
                </h1>
            </Link>

            
            {
                user ? (
                    <div className="pr-2">
                        <div className="relative">
                            <button onClick={toggleOpen} className="flex items-center py-2">
                                <span>
                                    { user.name }
                                </span>
                                <svg
                                    className="ml-2 -mr-0.5 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            <ClickAwayListener onClickAway={() => setOpen(false)}>
                                <div className={`absolute right-0 bg-white border rounded shadow-md min-w-[12rem] py-2 ${!open && 'hidden'}`}>
                                    <Link href={route('products.index')} className="block w-full px-4 py-2 text-left hover:bg-gray-200">
                                        My Products
                                    </Link>
                                    <form onSubmit={logout}>
                                        <button className="block w-full px-4 py-2 text-left hover:bg-gray-200">
                                            Sign out
                                        </button>
                                    </form>
                                </div>
                            </ClickAwayListener>
                        </div>
                    </div>
                ) : (
                    <div className="flex space-x-4">
                        <Link href={route('login')}>
                            Login
                        </Link>
                        <Link href={route('register')} className="inline-block pr-2">
                            Register
                        </Link>
                    </div>
                )
            }
        </nav>
    )
}