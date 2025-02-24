import Bill from "./bill.model";

export const getBill = async (req, res) =>{

    const {limite = 10, desde = 0} = req.query;

    const query = {status: true};

    try {
        
        const bill = await Bill.find(query)
        .skip(Number(desde))
        .limit(Number(limite));

        const total = await Bill.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error getting bill',
            error
        })
    }
}

export const searchBill = async (req, res) =>{

    const {id}= req.params;

    try {
        
        const bill = await Bill.findById(id);

        if(!bill){
            return res.status(404).json({
                success: false,
                message: 'Bill not found'
            })
        }

        res.status(200).json({
            succes: true,
            bill
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error getting bill',
            error
        })
    }
}


export const deleteBill = async (req,res ) =>{

    const {id}= req.params;
    try {
        
        await bill.findByIdAndUpdate(id,{status: false});

        res.status(200).json({
            success: true,
            message: 'bill successfully removed'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'error deleting bill',
            error
        })
    }
}

export const updateBill = async (req, res) => {
    
    const {id} = req.params;
    const {_id,...data} = req.body;

    try {
    
        const bill = await Bill.findByIdAndUpdate(id,data,{new: true});
        
        res.status(200).json({
            success: true,
            message: 'Bill updated',
            bill
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating Bill',
            error
        })
    }
}