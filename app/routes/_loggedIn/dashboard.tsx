import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { pb } from '../../utils/pb'

const getOrganization = createServerFn()
    .validator((organization: string) => {
        return { organization }
    }).handler(async ({ data }: { data: { organization: string } }) => {
        return pb.collection('organizations').getOne(data.organization)
    })

export const Route = createFileRoute('/_loggedIn/dashboard')({
    component: RouteComponent,
    loader: async ({ context }) => {
        const org = await getOrganization({ data: context.user.organization })
        console.log({ org })
        return { user: context.user, org }
    },
})

function RouteComponent() {
    const { user, org } = Route.useLoaderData()
    return <div>
        Hello "/_loggedIn/dashboard"!
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <pre>{JSON.stringify(org, null, 2)}</pre>
    </div>
}
