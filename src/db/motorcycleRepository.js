import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function getMotorcycles() {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });
  try {
    const motorcycles = await db.all('SELECT * FROM Motorcycles');
    return motorcycles;
  } catch (error) {
    console.error('Error getting motorcycles:', error.message);
    throw error;
  } finally {
    db.close();
  }
}

export async function createMotorcycle(motorcycle) {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  const { manufacturer, model, km } = motorcycle;

  try {
    const result = await db.run(
      'INSERT INTO Motorcycles (manufacturer, model, km) VALUES (?, ?, ?)',
      [manufacturer, model, km]
    );
    return { id: result.lastID, ...motorcycle };
  } catch (error) {
    console.error('Error creating motorcycle:', error.message);
    throw error;
  } finally {
    db.close();
  }
}

export async function updateMotorcycle(motorcycle) {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  const { manufacturer, model, km, id } = motorcycle;

  try {
    await db.run(
      'UPDATE Motorcycles SET manufacturer = ?, model = ?, km = ? WHERE id = ?',
      [manufacturer, model, km, id]
    );

    const updatedMotorcycle = await db.get(
      'SELECT * FROM Motorcycles WHERE id = ?',
      [id]
    );
    return updatedMotorcycle;
  } catch (error) {
    console.error('Error updating motorcycle:', error.message);
    throw error;
  } finally {
    await db.close();
  }
}

export async function deleteMotorcycle(id) {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  try {
    await db.run('DELETE FROM Motorcycles WHERE id = ?', [id]);
    return { message: `Motorcycle with ID ${id} deleted successfully` };
  } catch (error) {
    console.error('Error deleting motorcycle:', error.message);
    throw error;
  } finally {
    await db.close();
  }
}
