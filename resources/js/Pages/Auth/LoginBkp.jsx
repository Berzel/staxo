<GuestLayout>
    <Head title="Log in" />

    {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

    <form onSubmit={submit}>
        <div>
            <InputLabel forInput="email" value="Email" />

            <TextInput
                type="text"
                name="email"
                value={data.email}
                className="block w-full mt-1"
                autoComplete="username"
                isFocused={true}
                handleChange={onHandleChange}
            />

            <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
            <InputLabel forInput="password" value="Password" />

            <TextInput
                type="password"
                name="password"
                value={data.password}
                className="block w-full mt-1"
                autoComplete="current-password"
                handleChange={onHandleChange}
            />

            <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="block mt-4">
            <label className="flex items-center">
                <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />

                <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
        </div>

        <div className="flex items-center justify-end mt-4">
            {canResetPassword && (
                <Link
                    href={route('password.request')}
                    className="text-sm text-gray-600 underline hover:text-gray-900"
                >
                    Forgot your password?
                </Link>
            )}

            <PrimaryButton className="ml-4" processing={processing}>
                Log in
            </PrimaryButton>
        </div>
    </form>
</GuestLayout>
