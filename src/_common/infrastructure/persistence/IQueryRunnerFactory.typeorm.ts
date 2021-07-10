import { Connection } from 'typeorm';

export const IQueryRunnerFactorySymbol = Symbol('QueryRunnerFactorySymbol');

export interface IQueryRunnerFactory {
  createQueryRunner(): ReturnType<Connection['createQueryRunner']>;
  transaction(
    ...args: Parameters<Connection['transaction']>
  ): ReturnType<Connection['transaction']>;
}
