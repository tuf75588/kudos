import { json } from '@remix-run/node';
import type {LoaderFunction} from '@remix-run/node';
import { requireUserId } from '~/utils/auth.server';
import Layout from '~/components/layout';
import { UserPanel } from '~/components/user-panel';
import { getOtherUsers } from '~/utils/user.server';
import { Outlet, useLoaderData } from '@remix-run/react';
export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  const users = await getOtherUsers(userId);
  console.log(users);
  return json({ users });
};
export default function HomeRoute() {
  const {users} = useLoaderData();
  return (
    <Layout>
        <Outlet />
      <div className="h-full flex">
        <UserPanel users={users} />
      </div>
    </Layout>
  );
}
