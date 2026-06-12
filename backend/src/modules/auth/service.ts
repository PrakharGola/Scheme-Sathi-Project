import { prisma } from "../../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export async function registerUser(params: {
  name: string;
  phone: string;
  password: string;
  language: string;
}) {
  const existing = await prisma.user.findUnique({
    where: { phone: params.phone }
  });
  if (existing) {
    throw { status: 400, message: "Phone already registered" };
  }

  const passwordHash = await bcrypt.hash(params.password, 10);
  const user = await prisma.user.create({
    data: {
      name: params.name,
      phone: params.phone,
      passwordHash,
      language: params.language as any,
      role: "USER"
    }
  });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token, user };
}

export async function loginUser(params: {
  phone: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({
    where: { phone: params.phone }
  });
  if (!user) {
    throw { status: 400, message: "Invalid credentials" };
  }

  const match = await bcrypt.compare(params.password, user.passwordHash);
  if (!match) {
    throw { status: 400, message: "Invalid credentials" };
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { token, user };
}
