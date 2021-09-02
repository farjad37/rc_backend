const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const imageService = require('./image.service');
const upload = require("../_middleware/uploadImgae/upload");
const fs = require("fs");
router.post("/uploadFiles", upload.single("file"), uploadFiles);

module.exports = router;



function uploadFiles(req, res, next) {
  try {
    console.log(req.file);

    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }

    imageService.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: req.body.data
      
      
    }).then(() =>  res.json({ message: 'Registration successful' }))
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
  validateRequest(req, next);
};

