function LoginForm() {
  return (
    <>
      <div className="mb-2">
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="loginUsername" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <div className="mb-2">
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="loginPassword" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
    </>
  )
}

function SignupForm() {
  return (
    <>
      <div className="mb-2">
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="signupUsername" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <div className="mb-2">
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="signupPassword" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create account</button>
    </>
  )
}


function LoginPage() {
  return (
    <section className="flex justify-center pt-16">
      <div className="flex flex-col w-96">
        <h1 className="font-bold text-4xl mb-3">Login</h1>
        <LoginForm />

        <h1 className="font-bold text-4xl mt-10 mb-3">Create account</h1>
        <SignupForm />
      </div>
    </section>
  )
}

export default LoginPage
