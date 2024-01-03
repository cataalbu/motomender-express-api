import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function initDB() {
  try {
    const db = await open({
      filename: './mydb.sqlite',
      driver: sqlite3.Database,
    });

    await db.exec(
      'CREATE TABLE IF NOT EXISTS Motorcycles (id INTEGER PRIMARY KEY AUTOINCREMENT, manufacturer TEXT, model TEXT, km TEXT)'
    );
    await db.exec(
      'CREATE TABLE IF NOT EXISTS MaintenanceActivities (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, maxKm TEXT, moneyInvested TEXT, motorcycle TEXT, observations TEXT)'
    );
    db.close();
  } catch (error) {
    console.log('Failed to open database: ', error.message);
  }
}
