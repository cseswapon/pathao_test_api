import express, { Router } from "express";
import {
  createOrder,
  getOrderInfo,
  createBulkOrder,
  getStores,
  createStore,
  getCities,
  getZones,
  getAreas,
  priceCalculation,
} from "./courier.controller";

const router: Router = express.Router();

router.get("/stores", getStores);
router.post("/stores", createStore);
router.get("/cities", getCities);
router.get("/cities/:cityId/zones", getZones);
router.get("/zones/:zoneId/areas", getAreas);
router.post("/price-calculation", priceCalculation);
router.post("/orders", createOrder);
router.post("/orders/bulk", createBulkOrder);
router.get("/orders/:consignmentId/info", getOrderInfo);

export const courierRoutes = router;
