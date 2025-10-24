const { default: mongoose } = require("mongoose");
const caseSchema = new mongoose.Schema({
    customer_id: {
        type: String,
        required: true
    },
    assigned_to: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ["high", "medium", "low"], // only allow these values
        default: "high", // default value
        required: true
    },
    status: {
        type: Boolean,
        default: true, // true by default
        required: true,
    },

    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Case = mongoose.model("Case", caseSchema);
module.exports = Case;