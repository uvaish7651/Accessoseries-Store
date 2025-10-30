import { Products } from "../Models/Product.js";

export const addProduct = async (req, res) => {
    const { title, description, price, category, qty, imgSrc } = req.body;
    try {
        let product = await Products.create({
            title, description, price, category, qty, imgSrc
        });
        res.json({
            message: "Product added successfully",
            product
        })
    } catch (error) {
        res.json(error.message)
    }
}

export const getProducts = async (req, res) => {
    let products = await Products.find().sort({ createdAt: -1 })
    res.json({
        message: "All products",
        products
    })
}

//find product by id

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        let product = await Products.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Invalid Id or Product not found"
            });
        }

        return res.status(200).json({
            message: "Specific product",
            product
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

//update product by id 



export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // _id ko request body se hata diya
        const { _id, ...updateData } = req.body;

        const product = await Products.findByIdAndUpdate(id, updateData, {
            new: true, // updated document return karega
            runValidators: true // schema validators apply karega
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

//delete product by id

export const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id;
        let product = await Products.findByIdAndDelete(id)
        if (!product) return res.json("Invalid id")
        res.json({
            message: "Product has been deleted",
            product
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

