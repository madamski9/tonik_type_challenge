'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoginFormData } from '@/types'
import { loginFields } from '@/utils/fields'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Link from 'next/link'
import { setCookie } from '@/lib/cookies'

const LoginForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e: any) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setError('')
    }

    const handleSubmit = async () => {
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
            setCookie('user', JSON.stringify(data), 7)
            router.push('/game')
        } catch (err) {
            setError('Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <ErrorMessage message={error} />
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="space-y-6">
                {loginFields.map((field) => (
                    <Input
                        key={field.name}
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        label={field.label}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                    />
                ))}

                <Button
                    type="submit"
                    isLoading={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </Button>
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
        </>
    )
}

export default LoginForm
