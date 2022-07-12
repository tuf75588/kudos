import { json } from '@remix-run/node';
import type {LoaderFunction} from '@remix-run/node';
import { requireUserId } from '~/utils/auth.server';
import Layout from '~/components/layout';
import { UserPanel } from '~/components/user-panel';
import { getOtherUsers } from '~/utils/user.server';
export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  const users = await getOtherUsers(userId);
  return json({ users });
};
export default function HomeRoute() {
  return (
    <Layout>
      <div className="h-full flex">
        <UserPanel />
      </div>
    </Layout>
  );
}
