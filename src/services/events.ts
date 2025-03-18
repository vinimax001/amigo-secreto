import { PrismaClient } from "@prisma/client"

// Instancia o cliente Prisma para interagir com o banco de dados.
const prisma = new PrismaClient();

// Busca todos os registros da tabela 'event'.
export const getAll = async () => {
    try {
        return await prisma.event.findMany()
    } catch(err) { return false }
}

// Busca um registro da tabela 'event' com o 'id' especificado.
export const getOne = async (id: number) => {
    try {
        return await prisma.event.findFirst({ where: { id } })
    } catch(err) {return false}
}