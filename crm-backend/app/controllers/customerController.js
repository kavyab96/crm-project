const Customers = require("../models/customerModel");

// getting all posts
exports.getCustomers = async (req, res,next) => {
    try {
        const { search } = req.query;
        // return res.status(200).json(search);
        let customers;
        if (search) {
            //filtering data based on 'search'
            customers = await Customers.find({
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { contact_info: { $regex: search, $options: "i" } },
                ],
               
            })
        } else {
            customers = await Customers.find();
        }
        // if (customers.length === 0) {
        //     return res.status(04).json({ message: "No customer found" })
        // }
        res.status(200).json({ message: "customers retrieved successfully", customers })
    } catch (error) {
         next(error)
    }

}

//cretate new Cutomer
exports.addCustomer = async (req, res,next) => {
    try {

        const { name, contact_info,status } = req.body

        const newCustomer = new Customers({ name, contact_info,status });
        await newCustomer.save();
        res.status(201).json({ success: true, message: 'New Cutomer Created Successfully', customer: newCustomer })

    } catch (error) {
         next(error)
    }

}

// customer partial update
exports.updateCustomers = async (req, res,next) => {

    try {

        const { id } = req.params;
        const updates = req.body

        const customer = await Customers.findByIdAndUpdate(
            id, updates, { new: true, runValidators: true }
        )
        if (!customer) {
            return res.status(404).json({ message: "customer not found" })
        }

        return res.status(200).json({ message: "customer  updated successfully ", customer: customer })


    } catch (error) {
         next(error)
    }


}

// //delete item
exports.delCustomer = async (req, res,next) => {
    try {
        const { id } = req.params;
        const customer = await Customers.findByIdAndDelete(id)
        if (!customer) {
            return res.status(404).json({ message: "customer not found" })
        }
        res.status(200).json({success:true, message: "customer deleted successfully"})
    } catch (error) {
         next(error)
    }

}