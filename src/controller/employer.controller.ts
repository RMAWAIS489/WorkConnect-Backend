import { Request, Response } from "express";
import {
  createEmployer,
  deleteEmployerByUserId,
  getAllEmployers,
  getEmployerByUserId,
  updateEmployer,
} from "../services/employer.service.js";

export const createEmployerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.user || {};
    if (!userId) {
      res.status(400).json({ message: "User not authenticated" });
      return;
    }
    const {
      company_name,
      contact_number,
      email,
      address,
      website,
      industry_type,
      company_description,
      linkedin_url,
    } = req.body;
    const employer = await createEmployer(userId, {
      company_name,
      contact_number,
      email,
      address,
      website,
      industry_type,
      company_description,
      linkedin_url,
    });
    res
      .status(201)
      .json({ message: "Employer created successfully", employer });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const fetchAllEmployersController = async (req: Request, res: Response) => {
  try {
    const employers = await getAllEmployers();
    res.status(200).json({ success: true, data: employers });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const fetchEmployerByUserId = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const employer = await getEmployerByUserId(userId);
    res.status(200).json({ success: true, data: employer });
  } catch (error: any) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const updateEmployerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = Number(req.params.userId);
    const updatedData = req.body;
    const updatedEmployer = await updateEmployer(userId, updatedData);
    res.json({
      success: true,
      data: updatedEmployer,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteEmployerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = Number(req.params.userId);
    await deleteEmployerByUserId(userId);
    res.json({
      success: true,
      message: "Employer deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
