import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as neo4j from 'neo4j-driver';

@Injectable()
export class Neo4jClient {
  private _driver: neo4j.Driver;
  constructor(private _configService: ConfigService) {
    this._driver = neo4j.driver(
      this._configService.get('GRAPH_DB_CONNECTION_URL'),
      neo4j.auth.basic(
        this._configService.get('GRAPH_DB_USERNAME'),
        this._configService.get('GRAPH_DB_PASSWORD'),
      ),
    );
  }

  public async write(...args: Parameters<neo4j.Transaction['run']>) {
    return await this.runInSession(async (session: neo4j.Session) => {
      return await session.writeTransaction(async (txc) => {
        return await txc.run(...args);
      });
    });
  }

  public async read(...args: Parameters<neo4j.Transaction['run']>) {
    return await this.runInSession(async (session: neo4j.Session) => {
      return await session.readTransaction(async (txc) => {
        return await txc.run(...args);
      });
    });
  }

  public connect() {
    return this._driver.session({
      database: this._configService.get('GRAPH_DB_NAME'),
    });
  }

  private async runInSession(
    callback: (session: neo4j.Session) => Promise<neo4j.QueryResult>,
  ) {
    const session = this.connect();

    const result = await callback(session);

    session.close();
    return result;
  }
}
