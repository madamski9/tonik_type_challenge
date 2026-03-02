import React from 'react'
import Container from '@/components/layout/Container'
import LoginForm from '@/components/auth/LoginForm'

const Login = () => {
    return (
        <Container>
            <div className="flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="rounded-lg shadow-lg p-8">
                        <h1 className="text-3xl font-bold text-center mb-8">
                            Login
                        </h1>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Login
