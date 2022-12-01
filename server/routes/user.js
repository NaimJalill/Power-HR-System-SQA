import express from "express"; // import express

import { AuthToken, AuthAdmin, AuthApplicant } from "../middleware/Auth.js";
import { getUserByID, changePassword } from "../controllers/user.js"; // import the getUsers and createUser functions from the user controller

const router = express.Router(); // create a router

// router.get('/', AuthAdmin, getUsers);

router.get("/:id", AuthAdmin, getUserByID);

router.get("/user", AuthToken, getUserByID);

router.post("/changepassword", AuthApplicant, changePassword);

export default router; // export the router