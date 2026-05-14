import { NextResponse } from "next/server";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

type JsonUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isActive: boolean;
  createdAt: string;
};

const usersFilePath = path.join(process.cwd(), "data", "users.json");

const readUsers = async (): Promise<JsonUser[]> => {
  const content = await readFile(usersFilePath, "utf-8");
  return JSON.parse(content) as JsonUser[];
};

const writeUsers = async (users: JsonUser[]) => {
  await writeFile(usersFilePath, `${JSON.stringify(users, null, 2)}\n`, "utf-8");
};

const toPublicUser = (user: JsonUser) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  isActive: user.isActive,
  createdAt: user.createdAt,
});

export async function POST(request: Request) {
  try {
    const { name, email, password } = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
    };

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Nom, email et mot de passe requis." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Le mot de passe doit contenir au moins 8 caractères." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const users = await readUsers();
    const userExists = users.some(
      (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (userExists) {
      return NextResponse.json(
        { message: "Un utilisateur existe déjà avec cet email." },
        { status: 409 }
      );
    }

    const newUser: JsonUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: "user",
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    await writeUsers([...users, newUser]);

    return NextResponse.json(
      {
        message: "Compte créé avec succès.",
        user: toPublicUser(newUser),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("JSON register error:", error);
    return NextResponse.json(
      { message: "Impossible d'enregistrer l'utilisateur local." },
      { status: 500 }
    );
  }
}
