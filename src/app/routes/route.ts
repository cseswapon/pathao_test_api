import express, { Router } from "express";
import { notFound } from "../middleware/notFound";
import { courierRoutes } from "../module/courier/courier.route";

interface IRoute {
  path: string;
  route: Router;
}

const router: Router = express.Router();
const apiVersion = `/api/v1`;

const moduleRouter: IRoute[] = [
  {
    path: `${apiVersion}/couriers`,
    route: courierRoutes,
  },
];

moduleRouter.forEach((route) => {
  router.use(route.path, route.route);
});

router.use(notFound);

export default router;
