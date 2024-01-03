import * as MaintenanceActivityRepository from '../db/maintenanceActivityRepository.js';

export function getMaintenanceActivities(clients) {
  return async (req, res, next) => {
    const activity =
      await MaintenanceActivityRepository.getMaintenanceActivities();
    console.log('GET /maintenanceActivity');
    res.json(activity);
  };
}

export function createMaintenanceActivity(clients) {
  return async (req, res, next) => {
    const activity =
      await MaintenanceActivityRepository.createMaintenanceActivity(req.body);
    console.log('POST /maintenanceActivity', activity);
    clients.forEach((client) => {
      client.send(
        JSON.stringify({ action: 'add-maintenance-activity', data: activity })
      );
    });

    return res.json(activity);
  };
}

export function updateMaintenanceActivity(clients) {
  return async (req, res, next) => {
    const activity =
      await MaintenanceActivityRepository.updateMaintenanceActivity(req.body);
    console.log('PUT /maintenanceActivity', activity);
    clients.forEach((client) => {
      client.send(
        JSON.stringify({
          action: 'update-maintenance-activity',
          data: activity,
        })
      );
    });

    return res.json(activity);
  };
}

export function deleteMaintenanceActivity(clients) {
  return async (req, res, next) => {
    await MaintenanceActivityRepository.deleteMaintenanceActivity(
      req.params.id
    );
    console.log('DELETE /maintenanceActivity', req.params.id);
    clients.forEach((client) => {
      client.send(
        JSON.stringify({
          action: 'delete-maintenance-activity',
          data: req.params.id,
        })
      );
    });

    return res.json({ id: req.params.id });
  };
}
