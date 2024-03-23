import express from "express";
import mongoService from "../dao/mongo.service.js";

const router = express.Router();


router.get("/chat", (req, res) => {
 
  res.render("index", {});
});

router.post("/chat", async (req, res) => {
  const resp = req.body;
  

  await mongoService.createUser(resp);
  
})

export default router;