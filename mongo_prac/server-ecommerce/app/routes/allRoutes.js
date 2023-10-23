import express from "express";
import tasksRouter from "./tasksRouter.js";
import listsRouter from "./listsRouter.js";
import usersRouter from "./usersRouter.js";
import ratingsRouter from "./ratingsRouter.js";
import shops from "./shops.js";
import itemShopsRouter from "./itemShopsRouter.js";
import cartsRouter from "./cartsRouter.js";
import checkoutRouter from "./checkoutRouter.js";
import payment from "./payment.js"
import productCategoriesRouter from "./itemCategoryRouter.js";

const app = express();

const router = express.Router();

// Define the base route for all v1 API routes
router.use((req, res, next) => {
    // Here, you can add any common middleware or authorization checks for all v1 routes
    next();
});


router.use("/shops", shops);
router.use("/items", itemShopsRouter);
router.use("/ratings", ratingsRouter);
router.use("/users", usersRouter);
router.use("/tasks", tasksRouter);
router.use("/lists", listsRouter);
router.use("/carts", cartsRouter);
router.use("/checkout", checkoutRouter);
router.use("/payment", payment);
router.use("/item-category", productCategoriesRouter);

export default router;