declare module "bcryptjs" {
  export function hash(s: string, salt: number): Promise<string>;
  export function compare(
    currentPassword: string,
    hashedPassword: string
  ): boolean;
  // Добавьте другие необходимые функции по аналогии
}
