import { Router } from "express";
import { adPicturesUpload } from "../middlewares/upload.js";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";
import { authorize } from "../middlewares/authz.js";
import { auth } from "../middlewares/auth.js";

// PRODUCT ROUTER
export const productRouter = Router();

// ROUTES
productRouter.post(
  "/add-product",
  auth,
  authorize(["admin"]),
  adPicturesUpload.single("image"),
  addProduct
);

productRouter.patch(
  "/update-product/:id",
  auth,
  authorize(["admin"]),
  updateProduct
);

productRouter.get("/products", getProducts);

productRouter.get("/product/:id", getProduct);

productRouter.delete(
  "/product/:id",
   auth, authorize(["admin"]), deleteProduct);
