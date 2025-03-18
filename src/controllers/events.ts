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

// Função para editar evento especifico
export const updateEvent: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const updateEventSchema = z.object({
        status: z.boolean().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        grouped: z.boolean().optional()
    });

    const body = updateEventSchema.safeParse(req.body);
    if (!body.success) {
        res.status(400).json({ error: 'Dados inválidos' });
        return;
    }

    try {
        const updatedEvent = await events.update(parseInt(id), body.data);
        if (updatedEvent) {
            res.status(200).json({ event: updatedEvent });
        } else {
            res.status(404).json({ error: 'Evento não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro' });
    }
};