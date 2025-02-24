import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { logout } from '../../utils/auth'

export const Route = createFileRoute('/_auth/logout')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()

    useEffect(() => {
        const _logout = async () => {
            await logout()
            navigate({ to: '/' })
        }

        _logout()
    }, [navigate])

    return null
}
