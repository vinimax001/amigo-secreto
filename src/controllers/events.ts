import { RequestHandler } from "express";
import * as events from '../services/events';
import { z } from "zod";


//Função assíncrona para obter todos os eventos.
export const getAll: RequestHandler = async (req, res) => {
    // Chama a função getAll do serviço de eventos
    const items = await events.getAll();
    // Se a lista de eventos existir, envia uma resposta JSON com os eventos.
    if (items) {
        res.json({ events: items });
        return;
    }
    res.json({ error: 'Ocorreu um erro' });
    return;
};

// Função assíncrona para obter evento especifico
export const getEvent: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const eventItem = await events.getOne(parseInt(id));
    if (eventItem) {
        res.json({ event: eventItem });
        return;
    }

    res.json({ error: 'Ocorreu um erro'});
    return;
}

// Função para criar um evento usando prisma e zod
export const addEvent: RequestHandler = async (req, res) => {
    const addEventSchema = z.object({
        title: z.string(),
        description: z.string(),
        grouped: z.boolean()
    });

    const body = addEventSchema.safeParse(req.body);
    if (!body.success) {
        res.json({ error: 'Dados inválidos' });
        return;
    }

    try {
        const newEvent = await events.add(body.data);
        if (newEvent) {
            res.status(201).json({ event: newEvent });
        } else {
            res.json({ error: 'Ocorreu um erro' });
        }
    } catch (error) {
        res.json({ error: 'Ocorreu um erro' });
    }
};