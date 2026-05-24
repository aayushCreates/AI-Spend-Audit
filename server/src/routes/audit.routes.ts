import { Router } from "express";
import {
  auditResult,
  postAudit,
  sendAuditResult,
} from "../controllers/audit.controller";

const auditRouter = Router();

auditRouter.post("/send-email", sendAuditResult);
auditRouter.get("/:id", auditResult);

auditRouter.post("/", postAudit);

export default auditRouter;
