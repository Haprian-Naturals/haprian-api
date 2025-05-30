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
  "/products",
  auth,
  authorize(["admin","vendor"]),
  adPicturesUpload.single("image"),
  addProduct
);

productRouter.patch(
  "/products/:id",
  auth,
  authorize(["admin", "vendor"]),
  adPicturesUpload.single("image"),
  updateProduct
);

productRouter.get("/products", getProducts);

productRouter.get("/products/:id", getProduct);

productRouter.delete(
  "/products/:id",
   auth, authorize(["admin"]), deleteProduct);
