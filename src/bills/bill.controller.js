import Bill from "./bill.model.js";

export const searchBill = async (req, res) => {
    const { id } = req.params;

    try {
        const bills = await Bill.find({ user: id });

        if (bills.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron facturas'
            });
        }

        res.status(200).json({
            success: true,
            bills 
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener facturas',
            error
        });
    }
};

export const updateBill = async (req, res) => {
    
    const {id} = req.params;
    const {_id,...data} = req.body;

    try {
    
        const bill = await Bill.findByIdAndUpdate(id,data,{new: true});
        
        res.status(200).json({
            success: true,
            message: 'Factura actualizada',
            bill
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar factura',
            error
        })
    }
}