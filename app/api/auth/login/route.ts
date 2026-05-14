import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
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
    const { email, password } = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email et mot de passe requis." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const users = await readUsers();
    const user = users.find(
      (item) =>
        item.email.toLowerCase() === normalizedEmail &&
        item.password === password &&
        item.isActive
    );

    if (!user) {
      return NextResponse.json(
        { message: "Identifiants invalides." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      token: `local-json-token-${user.id}`,
      user: toPublicUser(user),
    });
  } catch (error) {
    console.error("JSON login error:", error);
    return NextResponse.json(
      { message: "Impossible de lire les utilisateurs locaux." },
      { status: 500 }
    );
  }
}
