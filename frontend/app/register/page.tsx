import React from 'react'
import Container from '@/components/layout/Container'
import RegisterForm from '@/components/auth/RegisterForm'

const Register = () => {
    return (
        <Container>
            <div className="flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="rounded-lg shadow-lg p-8">
                        <h1 className="text-3xl font-bold text-center mb-8">
                            Register
                        </h1>
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Register
