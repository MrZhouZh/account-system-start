'use client'

import { useRef } from 'react'
import axios from 'axios'
import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

async function login({ username, password }: AccountInfo) {
  const result = await axios.post(`/api/login`, {
    username, password
  })

  console.log(result, '--result')
  if (result.data.code === 200) {
    alert('login success')
  } else {
    alert(result.data.message)
  }

  return result.data
}

function LoginForm() {
  const loginMutation = useMutation(login)

  const $username = useRef<HTMLInputElement | null>(null)
  const $password = useRef<HTMLInputElement | null>(null)

  function onClickLogin() {
    const username = $username.current?.value
    const password = $password.current?.value
    if (!username || !password) return

    loginMutation.mutate({ username, password })
  }

  return (
    <>
      {/* {loginMutation.isError
        ? <div className="text-red-400">{loginMutation.error.message}</div>
        : null} */}
      <div className="mb-2">
        <label htmlFor="username">Username:</label>
        <input ref={$username} type="text" name="username" id="loginUsername" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <div className="mb-2">
        <label htmlFor="password">Password:</label>
        <input ref={$password} type="password" name="password" id="loginPassword" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <button
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={onClickLogin}
      >
        Login
      </button>
    </>
  )
}

async function createAccount({ username, password }: AccountInfo) {
  await axios.post(`/api/signup`, {
    username, password
  })
}

function SignupForm() {
  const $username = useRef<HTMLInputElement | null>(null)
  const $password = useRef<HTMLInputElement | null>(null)

  const createAccountMutation = useMutation(createAccount, {
    onSuccess() {
      alert('created!')
    }
  })

  function onClickCreateAccount() {
    const username = $username.current?.value
    const password = $password.current?.value
    if (!username || !password) return

    createAccountMutation.mutate({ username, password })
  }
  return (
    <>
      <div className="mb-2">
        <label htmlFor="username">Username:</label>
        <input ref={$username} type="text" name="username" id="signupUsername" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <div className="mb-2">
        <label htmlFor="password">Password:</label>
        <input ref={$password} type="password" name="password" id="signupPassword" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
      <button
        disabled={createAccountMutation.isLoading}
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={onClickCreateAccount}
      >
        Create account
      </button>
    </>
  )
}


function LoginPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <section className="flex justify-center pt-16">
        <div className="flex flex-col w-96">
          <h1 className="font-bold text-4xl mb-3">Login</h1>
          <LoginForm />

          <h1 className="font-bold text-4xl mt-10 mb-3">Create account</h1>
          <SignupForm />
        </div>
      </section>
    </QueryClientProvider>
  )
}

export default LoginPage
