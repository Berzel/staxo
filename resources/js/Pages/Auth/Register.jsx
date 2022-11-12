import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import AppLayout from '@/Layouts/AppLayout';

export default function Register() {
    function RegisterForm() {
        const { data, setData, post, processing, errors, reset } = useForm({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        });

        useEffect(() => {
            return () => {
                reset('password', 'password_confirmation');
            };
        }, []);

        const onHandleChange = (event) => {
            setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
        };

        const submit = (e) => {
            e.preventDefault();
            post(route('register'));
        };

        return (
            <>
                <div className='pb-4 border-b'>
                    <h1 className='text-lg font-semibold'>
                        Register
                    </h1>
                    <p className='` text-sm text-gray-500 mt-2 max-w-[80%]'>
                        You can log in using your facebook google or twitter account.
                    </p>
                </div>

                <form onSubmit={submit}>
                    <div className='mt-12'>
                        <label htmlFor="name" className="block">
                            <div className="text-sm font-semibold">Full Name <span className="text-red-400">*</span></div>
                            <input
                                required
                                id="name"
                                name="name"
                                type="text"
                                value={data.name ?? ''}
                                onChange={onHandleChange}
                                className="block w-full border rounded"  />
                        </label>
                        { errors.name && <div className="mt-1 text-sm text-red-500">{errors.name}</div> }
                    </div>
                    <div className='mt-8'>
                        <label htmlFor="email" className="block">
                            <div className="text-sm font-semibold">Email Address <span className="text-red-400">*</span></div>
                            <input
                                required
                                id="email"
                                name="email"
                                type="email"
                                value={data.email ?? ''}
                                onChange={onHandleChange}
                                className="block w-full border rounded"  />
                        </label>
                        { errors.email && <div className="mt-1 text-sm text-red-500">{errors.email}</div> }
                    </div>
                    <div className='mt-8'>
                        <label htmlFor="password" className="block">
                            <div className="text-sm font-semibold">Password <span className="text-red-400">*</span></div>
                            <input
                                required
                                id="password"
                                name="password"
                                type="password"
                                value={data.password ?? ''}
                                onChange={onHandleChange}
                                className="block w-full border rounded"  />
                        </label>
                        { errors.password && <div className="mt-1 text-sm text-red-500">{errors.password}</div> }
                    </div>
                    <div className='mt-8'>
                        <label htmlFor="password_confirmation" className="block">
                            <div className="text-sm font-semibold">Password Confirmation <span className="text-red-400">*</span></div>
                            <input
                                required
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                value={data.password_confirmation ?? ''}
                                onChange={onHandleChange}
                                className="block w-full border rounded"  />
                        </label>
                        { errors.password_confirmation && <div className="mt-1 text-sm text-red-500">{errors.password_confirmation}</div> }
                    </div>


                    <div className='mt-12'>
                        <button disabled={processing} className="block w-full px-4 py-4 font-semibold text-center text-white bg-indigo-500 rounded-lg">
                            {processing?'Submitting...':'Register'}
                        </button>
                    </div>

                    <div className='mt-8 text-center'>
                        <span>Already have an account?</span> <Link className="font-semibold text-indigo-700" href={route('login')}>Login Now</Link>
                    </div>
                </form>
            </>
        )
    }

    return (
        <>
            <Head title='Register' />

           <div className='md:hidden'>
                <AppLayout>
                    <div className="py-4 text-white bg-indigo-500">
                        <div className='container text-sm font-semibold'>
                            Home / Register
                        </div>
                    </div>

                    <div className='container mt-12'>
                        <div className='max-w-[30rem]'>
                            <RegisterForm />
                        </div>
                    </div>
                </AppLayout>
            </div>

            <div className='relative hidden md:flex'>
                <div className='w-[50%] flex-shrink-0'>
                    <div className='absolute w-full'>
                        <div className='container flex'>
                            <div className='w-[50%] flex-shrink-0 pr-24 flex flex-col justify-between min-h-screen'>
                                <div className='py-4'>
                                <Link href={route('home')} className="flex items-center space-x-2">
                                    <div className="w-10 h-10 bg-indigo-500 rounded-full">

                                    </div>
                                    <h1 className="text-lg font-semibold">
                                        Staxo
                                    </h1>
                                </Link>
                                </div>
                                <div>
                                <RegisterForm />
                                </div>
                                <div>Bottom</div>
                            </div>
                            <div className='w-[50%] flex-shrink-0'>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[50%] flex-shrink-0 bg-indigo-600 min-h-screen'>

                </div>
            </div>
        </>
    );
}
