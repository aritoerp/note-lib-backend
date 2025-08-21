const express     = require('express'); 
const router      = express.Router(); 
const routerHandler = require("./routerHandler.js");  


router.get("/health", routerHandler.health); 
router.post("/login", routerHandler.login);
router.post("/ebooks", routerHandler.getBooksByCategory);
router.post("/categories", routerHandler.categories);
router.post("/featured", routerHandler.featured);  
router.post("/recent", routerHandler.recent);
router.post("/popular", routerHandler.popular);
router.get("/download-pdf", routerHandler.downloadPdf); 

module.exports = router;
