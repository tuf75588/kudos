// remix will ensure files with a .server present will not be in bundles sent to the browser.
import type { RegisterForm, LoginForm } from './types.server';
import { prisma } from './prisma.server';
import { json } from '@remix-run/node';
import { createUser } from './user.server';
import bcrypt from 'bcryptjs';


export async function register(user: RegisterForm) {
  const exists = await prisma.user.count({ where: { email: user.email } });

  if (exists) {
    return json(
      { error: `User already exists with that email ${user.email}` },
      { status: 400 }
    );
  }

  const newUser = await createUser(user);
  if (!newUser) {
    return json(
      {
        error: `Something went wrong trying to create a new user.`,
      },
      { status: 400 }
    );
  }
}

export async function login({ email, password }: LoginForm) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return json({ error: `Incorrect login` }, { status: 400 });
  }

  return { id: user.id, email };
}
