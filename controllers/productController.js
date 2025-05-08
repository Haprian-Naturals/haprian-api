import { ProductModel } from "../models/product.js";
import { productValidator } from "../validators/productValidator.js";

export const addProduct = async (req, res, next) => {
  try {
    const { error, value } = productValidator.validate(
      {
        ...req.body,
        image: req.file?.filename
      },
      {
        abortEarly: false,
      }
    );
    if (error) {
      return res.status(422).json(error.details[0].message);
    }
    // Save product info in database
    const result = await ProductModel.create({
      ...value,
      userId: req.auth.id,
    });

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { filter = "{}", sort = "{}" }
    = req.query;

      // Parse filter and sort parameters with error handling
      let parsedFilter, parsedSort;
      try {
        parsedFilter = JSON.parse(filter);
        parsedSort = JSON.parse(sort);
      } catch (parseError) {
        return res
          .status(400)
          .json({ error: "Invalid filter or sort query parameters." });
      }
  
      // Fetch products from the database
      const result = await ProductModel.find(parsedFilter).sort(parsedSort);
  
      // Return response
      return res.status(200).json({products: result, totalProducts: result.length});
    } catch (error) {
      next(error);
     
  }
};

export const getProduct = async (req, res, next) => {
  const oneProduct = await ProductModel.findById(req.params.id);
  res.status(200).json({ product: oneProduct });
};




export const updateProduct = async (req, res, next) => {
  try {
    const updateData = { ...req.body };

    if (req.file && req.file.filename) {
      // Save the Cloudinary image URL
      updateData.image = req.file.filename;
    }

    const result = await ProductModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    return result
      ? res
          .status(200)
          .json({
            message: "Product updated successfully",
            updatedProduct: result,
          })
      : res.status(404).json("Product not found");
  } catch (error) {
    next(error);
  }
};


export const deleteProduct = async (req, res) => {
  const deleteById = await ProductModel.findByIdAndDelete(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json({message: "Product deleted successfully"});
};

