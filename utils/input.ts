import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export function ask(question: string): Promise<string> {
    return new Promise((resolve) => rl.question(question, resolve));
}

// se quiser encerrar o readline no final do programa
export function closeAsk() {
    rl.close();
}
