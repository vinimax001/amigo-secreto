//export const getToday = Intl.DateTimeFormat('pt-br').format(new Date())

export const getToday = (): string => {
    try {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}/${month}/${year}`;
    } catch (error) {
        console.error("Erro em getToday():", error);
        return ""; // Ou lance um erro, dependendo da sua lógica
    }
};