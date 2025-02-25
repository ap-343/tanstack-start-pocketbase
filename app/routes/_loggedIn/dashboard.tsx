import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_loggedIn/dashboard')({
    component: RouteComponent,
    loader: async ({ context }) => {
        console.log(context.user)
        return {
            user: context.user
        }
    }
})

function RouteComponent() {
    const { user } = Route.useLoaderData()
    return <div>
        Hello "/_loggedIn/dashboard"!
        <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
}
