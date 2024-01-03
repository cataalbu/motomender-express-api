import {
  getMotorcycles,
  createMotorcycle,
  updateMotorcycle,
  deleteMotorcycle,
} from '../controllers/motorcycleController.js';

export default function motorcycleRoutes(app, clients) {
  app.get('/motorcycle', getMotorcycles(clients));
  app.post('/motorcycle', createMotorcycle(clients));
  app.put('/motorcycle', updateMotorcycle(clients));
  app.delete('/motorcycle/:id', deleteMotorcycle(clients));
}
