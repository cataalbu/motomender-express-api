import {
  getMaintenanceActivities,
  createMaintenanceActivity,
  updateMaintenanceActivity,
  deleteMaintenanceActivity,
} from '../controllers/maintenanceActivityController.js';

export default function maintenanceActivityRoutes(app, clients) {
  app.get('/maintenanceActivity', getMaintenanceActivities(clients));
  app.post('/maintenanceActivity', createMaintenanceActivity(clients));
  app.put('/maintenanceActivity', updateMaintenanceActivity(clients));
  app.delete('/maintenanceActivity/:id', deleteMaintenanceActivity(clients));
}
