'use client'

import React from 'react'

interface ErrorMessageProps {
    message: string
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
    if (!message) return null

    return (
        <div className="mb-4 p-3 rounded bg-red-100 border border-red-400 text-red-700">
            {message}
        </div>
    )
}

export default ErrorMessage
