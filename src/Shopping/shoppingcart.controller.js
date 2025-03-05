import Cart from './shopping.model.js';

export const saveCart = async (req, res) =>{
    try{

        const data  = req.body
        const cart  = await Cart.create(data);
 
        return res.status(201).json({
            message: "Product has been saved on shopping cart",
            name: cart.name
        })
    }catch(e){
        return res.status(500).json({
            message: "Error saving product on cart",
            error: e.message
        });
    }
}