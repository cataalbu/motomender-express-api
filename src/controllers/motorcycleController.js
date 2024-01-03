import * as MotorcycleRepository from '../db/motorcycleRepository.js';

export function getMotorcycles() {
  return async (req, res, next) => {
    console.log('GET /motorcycle');
    const motorcycles = await MotorcycleRepository.getMotorcycles();
    res.json(motorcycles);
  };
}

export function createMotorcycle(clients) {
  return async (req, res, next) => {
    const motorcycle = await MotorcycleRepository.createMotorcycle(req.body);
    console.log('POST /motorcycle', motorcycle);
    clients.forEach((client) => {
      client.send(
        JSON.stringify({ action: 'add-motorcycle', data: motorcycle })
      );
    });

    return res.json(motorcycle);
  };
}

export function updateMotorcycle(clients) {
  return async (req, res, next) => {
    const motorcycle = await MotorcycleRepository.updateMotorcycle(req.body);
    console.log('PUT /motorcycle', motorcycle);
    clients.forEach((client) => {
      client.send(
        JSON.stringify({ action: 'update-motorcycle', data: motorcycle })
      );
    });

    return res.json(motorcycle);
  };
}

export function deleteMotorcycle(clients) {
  return async (req, res, next) => {
    await MotorcycleRepository.deleteMotorcycle(req.params.id);
    console.log('DELETE /motorcycle', req.params.id);
    clients.forEach((client) => {
      client.send(
        JSON.stringify({ action: 'delete-motorcycle', data: req.params.id })
      );
    });

    return res.json({ id: req.params.id });
  };
}
