import Product from "../models/Product.js"; 

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock_quantity,
      category_id,
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      stock_quantity,
      category_id
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const foundProduct = async (req, res) => {
  try {
    const nameRegex = new RegExp(req.body.name, 'i');
    const foundProducts = await Product.find({ name: nameRegex });

    res.status(200).json(foundProducts);
  } catch (error) {
    console.error("Error al buscar productos:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getBestSellingProduct = async (req, res) => {
  try {
    const bestSellingProduct = await Product.aggregate([
      {
        $lookup: {
          from: "shopping_carts",
          localField: "_id",
          foreignField: "product_id",
          as: "shoppingCarts"
        }
      },
      {
        $group: {
          _id: "$_id",
          product_name: { $first: "$name" },
          total_sold: { $sum: "$shoppingCarts.quantity" }
        }
      },
      {
        $sort: { total_sold: -1 }
      },
      {
        $limit: 1
      }
    ]);

    res.status(200).json(bestSellingProduct);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
