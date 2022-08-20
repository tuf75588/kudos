import { json, LoaderFunction } from "@remix-run/node";
import { Modal } from "~/components/modal";
import { useLoaderData } from "@remix-run/react";
import { getUser } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({request}) => {
  const user = await getUser(request);
  return json({user})
}


export default function profile() {
  const {user} = useLoaderData();
  return (
    <Modal isOpen={true} className="w-1/3">
      <div className="p-3">
        <h2 className="text-4xl font-semibold text-blue-600 text-center mb-4">Your profile</h2>
      </div>
    </Modal>
  )
}