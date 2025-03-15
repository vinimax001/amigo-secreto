// Importa a classe Router do Express para criar um roteador modular.
import { Router } from "express";

// Importa as interfaces Request e Response para tipagem forte dos parâmetros.
import { Request, Response } from "express";

// Cria uma nova instância do roteador Express.
const router = Router();

// Define uma rota GET para '/ping'.
router.get('/ping', (req, res) => {
  res.json({ pong: true });
});

// Exporta o roteador configurado para ser usado em outros arquivos.
export default router;