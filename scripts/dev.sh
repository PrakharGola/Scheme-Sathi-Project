cd "$(dirname "$0")/.."
npm run install:all
npm run prisma:generate
npm run dev
