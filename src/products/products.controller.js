import Product from "./products.model.js";

export const registerProduct = async (req, res) =>{
    try{

        const data  = req.body
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        const product  = await Product.create(data);
 
        return res.status(201).json({
            message: "Product has been created",
            name: product.name
        })
    }catch(e){
        return res.status(500).json({
            message: "Error when entering product",
            error: e.message
        });
    }
}


export const getProduct = async (req, res) =>{

    const {limite = 10, desde = 0} = req.query;

    const query = {status: true};

    try {
        
        const product = await Product.find(query)
        .skip(Number(desde))
        .limit(Number(limite));

        const total = await Product.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error getting products',
            error
        })
    }
}

export const searchProduct = async (req, res) =>{

    const {id}= req.params;

    try {
        
        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }

        res.status(200).json({
            succes: true,
            product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener producto',
            error
        })
    }
}


export const deleteProduct = async (req,res ) =>{

    const {id}= req.params;
    try {
        
        await Product.findByIdAndUpdate(id,{status: false});

        res.status(200).json({
            success: true,
            message: 'product successfully removed'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error deleting product',
            error
        })
    }
}

export const updateProduct = async (req, res) => {
    
    const {id} = req.params;
    const {_id,...data} = req.body;

    try {
    
        const product = await Product.findByIdAndUpdate(id,data,{new: true});
        
        res.status(200).json({
            success: true,
            message: 'Product updated',
            product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error
        })
    }
}