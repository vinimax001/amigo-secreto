//Importação da função getToday
import { getToday } from "../utils/getToday";

export const validatePassword = (password: string): boolean => {
    // Obtém a data atual no formato "DD/MM/AAAA", remove as barras e transforma em "DDMMYYYY"
    const currentPassword = getToday().split("/").join('');

    // Compara a senha fornecida com a data atual formatada
    return password === currentPassword;
}

export const createToken = () => {
    // Obtém a data atual no formato "DD/MM/AAAA", remove as barras e transforma em "DDMMYYYY"
    const currentPassword = getToday().split("/").join('');

    // Concatena a variável de ambiente DEFAULT_TOKEN com a data atual formatada
    return `${process.env.DEFAULT_TOKEN}${currentPassword}`;
}

export const validateToken = (token: string) => {
    // Cria um token usando a função createToken()
    const currentToken = createToken();

    // Compara o token fornecido com o token criado
    return token === currentToken;
}
