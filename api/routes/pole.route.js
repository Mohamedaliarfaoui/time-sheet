import express from "express";
import {
  addPole,
  addSocieteToPole,
  deleteSociete,
  deletePole,
  getSocietesByPole,
  getAllSocietes,
  getAllPoles,
} from "../controllers/pole.controller.js";

const router = express.Router();



router.post("/addPole", addPole);  
router.post("/addSociete/:poleId", addSocieteToPole);
router.delete("/deletePole/:poleId", deletePole);
router.delete("/deleteSociete/:societeId", deleteSociete);
router.get("/societes", getAllSocietes);
router.get("/getSocietesByPole/:poleId", getSocietesByPole);
router.get("/poles", getAllPoles);


export default router;