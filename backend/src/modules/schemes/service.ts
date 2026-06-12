import { prisma } from "../../config/db";

export async function listSchemes(query: {
  search?: string;
  state?: string;
  category?: string;
}) {
  const where: any = {};
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { description: { contains: query.search, mode: "insensitive" } }
    ];
  }
  if (query.category) {
    where.category = query.category;
  }
  if (query.state) {
    where.stateAvailability = {
      has: query.state
    };
  }

  return prisma.scheme.findMany({ where, orderBy: { name: "asc" } });
}

export async function getScheme(id: string) {
  const scheme = await prisma.scheme.findUnique({ where: { id } });
  if (!scheme) throw { status: 404, message: "Scheme not found" };
  return scheme;
}

export async function createScheme(data: any) {
  return prisma.scheme.create({ data });
}

export async function updateScheme(id: string, data: any) {
  await getScheme(id);
  return prisma.scheme.update({ where: { id }, data });
}

export async function deleteScheme(id: string) {
  await getScheme(id);
  await prisma.scheme.delete({ where: { id } });
}
