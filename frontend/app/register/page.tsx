'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Container from '@/components/Container'
import { RegisterFormData } from '@/types'
import { registerFields } from '@/lib/utils'
import Link from 'next/link'

const Register = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            })
            if (!response.ok) {
                const errorData = await response.json()
                setError(errorData.message || 'Registration failed. Please try again.')
                return
            }
            const data = await response.json()
            console.log("register data: ", data)
            router.push('/login')
        } catch (err) {
            setError('Registration failed. Please try again.')
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
                            Register
                        </h1>

                        {error && (
                            <div className="mb-4 p-3 rounded">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {registerFields.map((field) => (
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
                                {isLoading ? 'Creating account...' : 'Register'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm">
                                Already have an account?{' '}
                                <Link href="/login" className="font-medium hover-primary">
                                    Login here
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

export default Register
