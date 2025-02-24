import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { login } from '~/utils/auth'

export const Route = createFileRoute('/_auth/login')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const [error, setError] = useState<string | null>(null)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        try {
            await login({ data: formData })
            navigate({ to: '/' })
        } catch (error) {
            setError(String(error))
        }
    }

    return <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" className="border border-gray-300 rounded-md p-2" />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" className="border border-gray-300 rounded-md p-2" />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Login</button>
        </div>
    </form>
}
