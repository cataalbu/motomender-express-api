import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function getMaintenanceActivities() {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  try {
    const activities = await db.all('SELECT * FROM MaintenanceActivities');
    return activities;
  } catch (error) {
    console.error('Error getting maintenance activities:', error.message);
    throw error;
  } finally {
    db.close();
  }
}

export async function createMaintenanceActivity(activity) {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  const { name, maxKm, moneyInvested, motorcycle, observations } = activity;

  try {
    const result = await db.run(
      'INSERT INTO MaintenanceActivities (name, maxKm, moneyInvested, motorcycle, observations) VALUES (?, ?, ?, ?, ?)',
      [name, maxKm, moneyInvested, motorcycle, observations]
    );

    return { id: result.lastID, ...activity };
  } catch (error) {
    console.error('Error creating maintenance activity:', error.message);
    throw error;
  } finally {
    db.close();
  }
}
export async function updateMaintenanceActivity(activity) {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  const { name, maxKm, moneyInvested, motorcycle, observations, id } = activity;

  try {
    await db.run(
      'UPDATE MaintenanceActivities SET name = ?, maxKm = ?, moneyInvested = ?, motorcycle = ?, observations = ? WHERE id = ?',
      [name, maxKm, moneyInvested, motorcycle, observations, id]
    );

    const updatedActivity = await db.get(
      'SELECT * FROM MaintenanceActivities WHERE id = ?',
      [id]
    );
    return updatedActivity;
  } catch (error) {
    console.error('Error updating maintenance activity:', error.message);
    throw error;
  } finally {
    await db.close();
  }
}

export async function deleteMaintenanceActivity(id) {
  const db = await open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });

  try {
    await db.run('DELETE FROM MaintenanceActivities WHERE id = ?', [id]);
    return {
      message: `Maintenance activity with ID ${id} deleted successfully`,
    };
  } catch (error) {
    console.error('Error deleting maintenance activity:', error.message);
    throw error;
  } finally {
    db.close();
  }
}
