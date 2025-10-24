
const Case = require("../models/caseModel");

// getting all posts
exports.getcases = async (req, res,next) => {
    try {
        const { search } = req.query;

        let cases;
        if (search) {
            //filtering data based on 'search'
            cases = await Case.find({
                title: { $regex: search, $options: "i" }
            })
        } else {
            cases = await Case.find();
        }
        if (cases.length === 0) {
            return res.status(404).json({ message: "No case found" })
        }
        res.status(200).json({ message: "cases retrieved successfully", cases })
    } catch (error) {
          next(error)
    }

}

//cretate new case
exports.addCase = async (req, res,next) => {
    try {

        const { customer_id, assigned_to ,priority,status} = req.body
        
        const newCase = new Case({ customer_id, assigned_to,priority,status });
        await newCase.save();
        res.status(201).json({ success: true, message: 'New Case Created Successfully', case: newCase })

    } catch (error) {
          next(error)
    }

}

// case update
exports.updateCase = async (req, res,next) => {

    try {

        const { id } = req.params;
        const updates = req.body

        const post = await Case.findByIdAndUpdate(
            id, updates, { new: true, runValidators: true }
        )
        if (!post) {
            return res.status(404).json({ message: "Case not found" })
        }

        return res.status(200).json({ message: "Case partially updated successfully ", case: post })


    } catch (error) {
        next(error)
    }


}

// //delete case
exports.delCase = async (req, res,next) => {
    try {
        const { id } = req.params;
        const post = await Case.findByIdAndDelete(id)
        if (!post) {
            return res.status(404).json({ message: "Case not found" })
        }
        res.status(200).json({success:true, message: "Case deleted successfully"})
    } catch (error) {
           next(error)
    }

}