import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { logout } from '~/utils/auth'

export const Route = createFileRoute('/_auth/logout')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()

    useEffect(() => {
        logout()
        navigate({ to: '/' })
    }, [navigate])

    return null
}
