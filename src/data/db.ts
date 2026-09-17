import { open, type NitroSQLiteConnection } from 'react-native-nitro-sqlite';
import { migrations } from './migrations';

const DB_NAME = 'ar_organ_explorer.db';

let connection: NitroSQLiteConnection | null = null;

export function getDb(): NitroSQLiteConnection {
  if (!connection) {
    connection = open({ name: DB_NAME });
    runMigrations(connection);
  }
  return connection;
}

function runMigrations(db: NitroSQLiteConnection): void {
  const result = db.execute<{ user_version: number }>('PRAGMA user_version;');
  const currentVersion = result.rows.item(0)?.user_version ?? 0;

  const pending = migrations
    .filter(migration => migration.version > currentVersion)
    .sort((a, b) => a.version - b.version);

  for (const migration of pending) {
    for (const statement of migration.statements) {
      db.execute(statement);
    }
    db.execute(`PRAGMA user_version = ${migration.version};`);
  }
}

export function closeDb(): void {
  connection?.close();
  connection = null;
}

export function deleteDb(): void {
  connection?.close();
  connection?.delete();
  connection = null;
}
