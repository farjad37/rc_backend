const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const imageService = require('./image.service');
const upload = require("../_middleware/uploadImgae/upload");
const fs = require("fs");
const { map, isEmpty, forEach, filter, sortedUniqBy, isUndefined, uniqBy, groupBy } = require('lodash');

router.post("/uploadFiles", upload.array("file"), uploadFiles);

module.exports = router;



function uploadFiles(req, res, next) {
  
  try {
    map(req.files, (value, index) => {
    console.log(value, "okkkk");

    // if (req.file == undefined) {
    //   return res.send(`You must select a file.`);
    // }
    
    imageService.create({
      type: value.mimetype,
      name: value.originalname,
      data: req.body.data
    
      
    }).then(() =>  res.json({ message: 'Registration successful' }))
  })
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
  //validateRequest(req, next);

};

