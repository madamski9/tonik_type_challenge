'use client'

interface InputProps {
    label?: string
    error?: string
    className?: string
    type?: string
    id?: string
    name?: string
    value?: string
    placeholder?: string
    required?: boolean
    onChange?: (e: any) => void
}

const Input = ({ label, error, className = '', ...props }: InputProps) => {
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={props.id || props.name}
                    className="block text-sm font-medium mb-2"
                >
                    {label}
                </label>
            )}
            <input
                className={`input w-full px-4 py-2 ${className}`}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    )
}

export default Input
