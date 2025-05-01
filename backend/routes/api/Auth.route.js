const router = require("express").Router();

// Auth Controllers
const login = require("../../controllers/auth/login");
const register = require("../../controllers/auth/register");
const userData = require("../../controllers/auth/userData");
const deleteUser = require("../../controllers/auth/Deleteuser");
const updateUser = require("../../controllers/auth/updateUser");
const uploadFile = require("../../controllers/auth/uploadFile");
const createUser = require("../../controllers/auth/createUser");

// Stock Controllers
const {
  createStock,
  getStocks,
  updateStock,
  deleteStock,
} = require("../../controllers/auth/stockController");
const loginAdmin = require("../../controllers/auth/adminLogin");

router.post("/login", login);
router.post("/register", register);
router.get("/userData", userData);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateUser/:id", updateUser);
router.post("/upload", uploadFile);
router.post("/createUser", createUser);

router.post("/createStock", createStock);
router.get("/stocks", getStocks);
router.put("/updateStock/:id", updateStock);
router.delete("/deleteStock/:id", deleteStock);
router.post('/adminLogin', loginAdmin)

module.exports = router;
