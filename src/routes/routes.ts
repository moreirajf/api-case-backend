import { Router } from "express";
import CarrierController from '../controllers/CarrierController';

const routes = Router();

routes.post('/', CarrierController.getCarrying)

export default routes;