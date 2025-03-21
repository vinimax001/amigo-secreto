import { PrismaClient, Prisma } from "@prisma/client"

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

//Type para manipução banco de dados utilizando o prisma
type EventsCreateData = Prisma.Args<typeof prisma.event, 'create'> ['data'];

// Função para criação de eventos
export const add = async (data:EventsCreateData) => {
    try {
        return await prisma.event.create ({ data });
        } catch(err) { return false }
}

type EventsUpdateData = Prisma.Args<typeof prisma.event, 'update'> ['data'];
export const update = async (id:number, data: EventsUpdateData) => {
    try {
        return await prisma.event.update({ where: { id }, data });
    } catch(err) {return false }
}