import { LoginFormField, RegisterFormField } from "@/types";

export const loginFields: LoginFormField[] = [
    {
        label: "Username",
        type: "text",
        name: "username",
        placeholder: "Enter your username",
        required: true
    },
    {
        label: "Password",
        type: "password",
        name: "password",
        placeholder: "Enter your password",
        required: true
    }
]
export const registerFields: RegisterFormField[] = [
        {
            label: "Username",
            type: "text",
            name: "username",
            placeholder: "Choose a username",
            required: true
        },
        {
            label: "Email",
            type: "email",
            name: "email",
            placeholder: "Enter your email",
            required: true
        },
        {
            label: "Password",
            type: "password",
            name: "password",
            placeholder: "Create a password",
            required: true
        },
        {
            label: "Confirm Password",
            type: "password",
            name: "confirmPassword",
            placeholder: "Confirm your password",
            required: true
        }
    ]
