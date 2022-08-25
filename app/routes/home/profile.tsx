import { LoaderFunction, ActionFunction, redirect } from '@remix-run/node';
import { validateName } from '~/utils/validators.server';
import { json } from '@remix-run/node';
import { Modal } from '~/components/modal';
import { useLoaderData } from '@remix-run/react';
import { getUser } from '~/utils/auth.server';
import React, { useState } from 'react';
import FormField from '~/components/form-field';
import { departments } from '~/utils/constants';
import { SelectBox } from '~/components/select-box';

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json({ user });
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  let firstName = form.get('firstName');
  let lastName = form.get('lastName');
  let department = form.get('department');

  // make sure types are correct
  if (
    typeof firstName !== 'string' ||
    typeof lastName !== 'string' ||
    typeof department !== 'string'
  ) {
    return json({ error: `Invalid form data` }, { status: 400 });
  }
  // make sure they are formatted correctly
  const errors = {
    firstName: validateName(firstName),
    lastName: validateName(lastName),
    department: validateName(department),
  };

  if (Object.values(errors).some(Boolean)) {
    return json(
      { errors, fields: { department, firstName, lastName } },
      { status: 400 }
    );
  }
  return redirect('/home');
};

export default function ProfileSettings() {
  const { user } = useLoaderData();
  const [formData, setFormData] = useState({
    firstName: user?.profile?.firstName,
    lastName: user?.profile?.lastName,
    department: user?.profile?.department || 'MARKETING',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((data) => ({ ...data, [field]: e.target.value }));
  };

  return (
    <Modal isOpen={true} className="w-1/3">
      <div className="p-3">
        <h2 className="text-4xl font-semibold text-blue-600 text-center mb-4">
          Your profile
        </h2>
        <div className="flex">
          <div className="flex-1">
            <form method="POST">
              <FormField
                htmlFor="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange(e, 'firstName')}
              />
              <FormField
                htmlFor="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange(e, 'lastName')}
              />
              <SelectBox
                options={departments}
                id="department"
                name="department"
                label="Department"
                value={formData.department}
                className="w-full rounded-xl px-3 py-2 text-gray-400"
                onChange={(e) => handleInputChange(e, 'department')}
              />
              <div className="w-full text-right mt-4">
                <button className="roudned-xl bg-yellow-300 font-semibold text-blue-600 px-16 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
