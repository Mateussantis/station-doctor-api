import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config(); // <- Carrega as variáveis do arquivo .env para process.env

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  ENDPOINT_URL: z.string().url(),
  PORT: z.coerce.number(),
  HOST: z.string()
});

export const env = envSchema.parse(process.env);

export type Enviroment = z.infer<typeof envSchema>;
