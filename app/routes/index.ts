// ./app/routes/index.tsx
import type { LoaderFunction } from '@remix-run/node';
import {redirect} from '@remix-run/node';
import { requireUserId } from '~/utils/auth.server';
export const loader: LoaderFunction = async ({ request, params }) => {
  await requireUserId(request);
  return redirect('/home');
};
