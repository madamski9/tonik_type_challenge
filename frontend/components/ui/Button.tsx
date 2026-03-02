'use client'

interface ButtonProps {
    isLoading?: boolean
    children: React.ReactNode
    className?: string
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
}

const Button = ({ isLoading, children, className = '', disabled, ...props }: ButtonProps) => {
    return (
        <button
            className={`btn w-full font-semibold py-3 px-4 rounded-lg disabled:cursor-not-allowed ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    )
}

export default Button
