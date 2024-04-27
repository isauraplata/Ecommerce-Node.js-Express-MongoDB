import Category from "../models/Category.js"; 

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const {
      name,
      description,
    } = req.body;

    console.log(name,description)

    let newCategory = new Category({
      name,
      description,
    });

    let saved= await newCategory.save();
    console.log(saved)
    res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategory= await Category.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedCategory);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(204).json({ message: "Delete Succesfuly" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
