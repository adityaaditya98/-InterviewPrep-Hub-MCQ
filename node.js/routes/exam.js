const express = require('express');
const route = express.Router();

router.get("/exam",async (req,res)=>{
    console.log("checking exam");
});

module.exports = router;