export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginFormField {
  label: string;
  type: string;
  name: keyof LoginFormData;
  placeholder: string;
  required: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

export interface TextSnippet {
  id: number;
  content: string;
}

export interface GameResult {
  id?: number;
  userId?: number;
  textSnippetId: number;
  wordsPerMinute: number;
  accuracy: number;
  timeTaken: number;
  createdAt?: string;
}

export interface GameResultRequest {
  userId?: number;
  textSnippetId: number;
  wordsPerMinute: number;
  accuracy: number;
  timeTaken: number;
}
export interface RegisterFormData {
    username: string
    email: string
    password: string
    confirmPassword: string
}
export interface RegisterFormField {
    label: string
    type: string
    name: keyof RegisterFormData
    placeholder: string
    required: boolean
}