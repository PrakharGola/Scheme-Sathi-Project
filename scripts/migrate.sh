cd "$(dirname "$0")/.."
npx prisma migrate dev --schema prisma/schema.prisma
