import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { authenticate } from '~/utils/auth'

export const Route = createFileRoute('/_loggedIn')({
    component: RouteComponent,
    beforeLoad: async ({ context }) => {
        const user = await authenticate()
        if (!user) {
            throw redirect({ to: '/login' })
        }

        return { ...context, user }
    },
})

function RouteComponent() {
    return <Outlet />
}
