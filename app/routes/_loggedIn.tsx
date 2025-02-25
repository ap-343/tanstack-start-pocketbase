import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { authenticate } from '~/utils/auth'

export const Route = createFileRoute('/_loggedIn')({
    beforeLoad: async ({ context }) => {
        const user = await authenticate()
        if (!user) {
            throw redirect({ to: "/login" })
        }
        return { ...context, user }
    },
    component: RouteComponent,
})

function RouteComponent() {
    return <Outlet />
}
