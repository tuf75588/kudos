import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { requireUserId } from '~/utils/auth.server';
import Layout from '~/components/layout';
import { UserPanel } from '~/components/user-panel';
import { getOtherUsers } from '~/utils/user.server';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getFilteredKudos } from '~/utils/kudos.server';
import type { Kudo as IKudo, Profile } from '@prisma/client';
import { Kudo } from '~/components/kudo';
import { SearchBar } from '~/components/search-bar';
interface KudoWithProfile extends IKudo {
  author: {
    profile: Profile;
  };
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  const users = await getOtherUsers(userId);
  console.log(users);
  const kudos = await getFilteredKudos(userId, {}, {});
  return json({ users, kudos });
};

export default function Home() {
  const { users, kudos } = useLoaderData();
  return (
    <Layout>
      <Outlet />
      <div className="h-full flex">
        <UserPanel users={users} />
        <div className="flex-1 flex flex-col">
          <SearchBar />
          <div className="flex-1 flex">
            <div className="w-full p-10 flex flex-col gap-y-4">
              {kudos.map((kudo: KudoWithProfile) => (
                <Kudo key={kudo.id} kudo={kudo} profile={kudo.author.profile} />
              ))}
            </div>
            {/* Recent Kudos Goes Here */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
