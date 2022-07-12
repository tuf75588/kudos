import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { logout } from '~/utils/auth.server';
import { redirect } from '@remix-run/node';

export const action: ActionFunction = async ({ request }) =>
  await logout(request);

export const loader: LoaderFunction = async () => {
  return redirect('/');
};
