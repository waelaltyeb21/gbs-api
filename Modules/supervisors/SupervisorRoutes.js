const SupervisorRoutes = require("express").Router();
const {
  GetSupervisors,
  GetSupervisorById,
  CreateSupervisor,
  UpdateSupervisor,
  DeleteSupervisor,
} = require("./SupervisorController");

SupervisorRoutes.get("/", GetSupervisors);
SupervisorRoutes.get("/:id", GetSupervisorById);
SupervisorRoutes.post("/", CreateSupervisor);
SupervisorRoutes.put("/:id", UpdateSupervisor);
SupervisorRoutes.delete("/:id", DeleteSupervisor);

module.exports = SupervisorRoutes;
