import { Router, type IRouter } from "express";
import healthRouter from "./health";
import profilesRouter from "./profiles";
import usersRouter from "./users";
import linksRouter from "./links";
import appearanceRouter from "./appearance";

const router: IRouter = Router();

router.use(healthRouter);
router.use(profilesRouter);
router.use(usersRouter);
router.use(linksRouter);
router.use(appearanceRouter);

export default router;
