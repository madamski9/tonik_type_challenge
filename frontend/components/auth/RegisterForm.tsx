'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RegisterFormData } from '@/types'
import { registerFields } from '@/utils/fields'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ErrorMessage from '@/components/ui/ErrorMessage'
import Link from 'next/link'

const RegisterForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
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
            router.push('/login')
        } catch (err) {
            setError('Registration failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <ErrorMessage message={error} />

            <form onSubmit={handleSubmit} className="space-y-6">
                {registerFields.map((field) => (
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
                    {isLoading ? 'Creating account...' : 'Register'}
                </Button>
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
        </>
    )
}

export default RegisterForm
