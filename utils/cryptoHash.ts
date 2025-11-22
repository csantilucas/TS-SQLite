import crypto from "crypto";

/**
 * Gera o hash da senha usando SHA-256
 */
export function hashSenha(senha: string): string {
  return crypto.createHash("sha256").update(senha).digest("hex");
}

/**
 * Compara a senha digitada com o hash salvo
 */
export function compararSenha(senhaDigitada: string, senhaHash: string): boolean {
  return hashSenha(senhaDigitada) === senhaHash;
}