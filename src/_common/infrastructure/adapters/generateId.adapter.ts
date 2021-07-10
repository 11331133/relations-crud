import { nanoid } from 'nanoid/async';

export async function generateId(): Promise<string> {
  return await nanoid();
}
