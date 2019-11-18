import { Router } from 'express';
const router = Router();

router.get('/user/:userId', async (req, res) => {
  const vehicles = await req.context.models.Vehicle.findAll({where: { 
      userId: req.params.userId
  }});
  return res.send(vehicles);
});

router.get('/', async (req, res) => {
  const vehicles = await req.context.models.Vehicle.findAll();
  return res.send(vehicles);
});


router.get('/:vehicleId', async (req, res) => {
  const vehicle = await req.context.models.Vehicle.findByPk(
    req.params.vehicleId,
  )
  .then(vehicle => res.json(vehicle))
  .catch(err => res.status(404).json('Error: ' + err));
});

router.post('/', async (req, res) => {
  const vehicle = await req.context.models.Vehicle.create({
    make: req.body.make,
    model: req.body.model,
    price: req.body.price,
    year: req.body.year,
    mileage: req.body.mileage,
    userId: req.body.userId,
  })
  .then(vehicle => res.json(vehicle))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:vehicleId', async (req, res) => {
  await req.context.models.Vehicle.destroy({
    where: { id: req.params.vehicleId },
  })
  .then(() => res.json('Vehicle removed!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/:vehicleId', async (req, res) => {
  await req.context.models.Vehicle.findByPk(
    req.params.vehicleId,
  ).then(vehicle => {
    vehicle.make = req.body.make,
    vehicle.model = req.body.model,
    vehicle.price = req.body.price,
    vehicle.year = req.body.year,
    vehicle.mileage = req.body.mileage,
    vehicle.userId = req.body.userId

    vehicle.save()
      .then(() => res.json(vehicle))
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
});


export default router;