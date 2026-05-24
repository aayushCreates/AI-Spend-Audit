import { Request, Response, NextFunction } from "express";
import { AuditInput } from "../types/audit";
import { AuditServices } from "../services/audit.service";
import { AppError } from "../middlewares/error.middleware";

export async function postAudit(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { teamSize, useCases, tools, estimatedBudget, profile } =
      req.body as AuditInput;

    if (!teamSize || !useCases || !Array.isArray(tools) || tools.length === 0) {
      throw new AppError(
        400,
        "teamSize, useCases, and at least one tool are required",
      );
    }
    if (estimatedBudget === undefined || estimatedBudget === null) {
      throw new AppError(400, "estimatedBudget is required");
    }

    const result = await AuditServices.getResult({
      teamSize,
      useCases,
      tools,
      estimatedBudget,
      profile,
    });

    return res.status(201).json({
      success: true,
      message: "Audit created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

export async function auditResult(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params as { id: string };

    const result = await AuditServices.getAuditResult(id);

    if (!result) {
      throw new AppError(404, "Audit not found for the given ID");
    }

    return res.status(200).json({
      success: true,
      message: "Audit result fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

export async function sendAuditResult(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id, email } = req.body as { id: string; email: string };

    if (!id || !email) {
      throw new AppError(400, "id and email are required");
    }

    await AuditServices.sendAuditResultViaEmail(id, email);

    return res.status(200).json({
      success: true,
      message: "Audit result email sent successfully",
    });
  } catch (err) {
    next(err);
  }
}
