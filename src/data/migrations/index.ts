import * as m001 from './001_initial';

export type Migration = { version: number; statements: string[] };

export const migrations: Migration[] = [{ version: m001.version, statements: m001.statements }];
