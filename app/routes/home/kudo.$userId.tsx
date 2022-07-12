import { json, redirect } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
// import { getUserById } from '~/utils/user.server';


export const loader: LoaderFunction = async ({ request, params }) => {
  const { userId } = params

  if (typeof userId !== 'string') {
    return redirect('/home')
  }

  // const recipient = await getUserById(userId);
  // console.log(recipient)
  return null;
}

export default function KudosModal() {
  const data = useLoaderData();


  return (
    <h1>user </h1>
  )
}