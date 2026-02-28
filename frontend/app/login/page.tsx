'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Container from '@/components/Container'
import { LoginFormData } from '@/types'
import { loginFields } from '@/lib/utils'
import Link from 'next/link'

const Login = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setError('')
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            })
            if (!response.ok) {
                const errorData = await response.json()
                setError(errorData.message || 'Login failed. Please try again.')
                return
            }
            const data = await response.json()
            console.log("login data: ", data)
            localStorage.setItem('user', JSON.stringify(data))
            router.push('/game')
        } catch (err) {
            setError('Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container>
            <div className="flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="rounded-lg shadow-lg p-8">
                        <h1 className="text-3xl font-bold text-center mb-8">
                            Login
                        </h1>

                        {error && (
                            <div className="mb-4 p-3 rounded">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {loginFields.map((field) => (
                                <div key={field.name}>
                                    <label
                                        htmlFor={field.name}
                                        className="block text-sm font-medium mb-2"
                                    >
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        id={field.name}
                                        name={field.name}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        placeholder={field.placeholder}
                                        required={field.required}
                                        className="input w-full px-4 py-2"
                                    />
                                </div>
                            ))}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn w-full font-semibold py-3 px-4 rounded-lg disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                        <div className="mt-6 text-center">
                            <p className="text-sm">
                                Don't have an account?{' '}
                                <Link href="/register" className="font-medium hover-primary">
                                    Register here
                                </Link>
                            </p>
                        </div>
                        <div className="mt-4 text-center">
                            <Link href="/" className="text-sm">
                                ← Back to home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Login
