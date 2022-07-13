import { json, redirect } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getUserById } from '~/utils/user.server';


export const loader: LoaderFunction = async ({ request, params }) => {
  const { userId } = params

  if (typeof userId !== 'string') {
    return redirect('/home')
  }

  const recipient = await getUserById(userId)
  return json({ recipient })
}

export default function KudosModal() {
  const data = useLoaderData();
  const {firstName} = data.recipient.profile;
  
  return (
    <h1>user {firstName} </h1>
  )
}