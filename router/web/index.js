const express = require('express'); 
const router = express.Router(); 
const routerHandler = require("./routerHandler.js");  

router.get("/health", routerHandler.health); 
router.post("/login", routerHandler.login);
router.post("/categories", routerHandler.categories);
router.post("/ebooks", routerHandler.getBooksByCategory);
router.post("/featured", routerHandler.featured);  
router.post("/recent", routerHandler.recent);
router.post("/popular", routerHandler.popular);
router.post("/euresource", routerHandler.euresource);
router.post("/activities", routerHandler.activities);
router.post("/search", routerHandler.search);
router.get("/download-pdf", routerHandler.downloadPdf); 

module.exports = router;
