import { Request, Response } from "express";
import { CourierService } from "./courier.service";
import { env } from "../../config";

const courierService = new CourierService(
  env.CLIENT_ID,
  env.CLIENT_SECRET,
  env.BASE_URL,
  env.USERNAME,
  env.PASSWORD,
);

const handleResponse = (res: Response, data: unknown, status = 200) => {
  res.status(status).json(data);
};

const handleError = (res: Response, error: unknown) => {
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred";
  res.status(500).json({ success: false, message });
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const result = await courierService.createOrder(req.body);
    handleResponse(res, result);
  } catch (error) {
    handleError(res, error);
  }
};

export const getOrderInfo = async (req: Request, res: Response) => {
  try {
    const consignmentId = String(req.params.consignmentId);
    const result = await courierService.getOrderInfo(consignmentId);
    handleResponse(res, result);
  } catch (error) {
    handleError(res, error);
  }
};

export const createBulkOrder = async (req: Request, res: Response) => {
  try {
    const result = await courierService.createBulkOrder(req.body);
    handleResponse(res, result, 202);
  } catch (error) {
    handleError(res, error);
  }
};

export const getStores = async (req: Request, res: Response) => {
  try {
    const result = await courierService.getStores();
    handleResponse(res, result);
  } catch (error) {
    handleError(res, error);
  }
};

export const createStore = async (req: Request, res: Response) => {
  try {
    const result = await courierService.createStore(req.body);
    handleResponse(res, result);
  } catch (error) {
    handleError(res, error);
  }
};

export const getCities = async (req: Request, res: Response) => {
  try {
    const result = await courierService.getCities();
    handleResponse(res, result);
  } catch (error) {
    handleError(res, error);
  }
};

export const getZones = async (req: Request, res: Response) => {
  try {
    const cityId = Number(req.params.cityId);
    const result = await courierService.getZones(cityId);
    handleResponse(res, result);
  } catch (error) {
    handleError(res, error);
  }
};

export const getAreas = async (req: Request, res: Response) => {
  try {
    const zoneId = Number(req.params.zoneId);
    const result = await courierService.getAreas(zoneId);
    handleResponse(res, result);
  } catch (error) {
    handleError(res, error);
  }
};

export const priceCalculation = async (req: Request, res: Response) => {
  try {
    const result = await courierService.priceCalculation(req.body);
    handleResponse(res, result);
  } catch (error) {
    handleError(res, error);
  }
};
