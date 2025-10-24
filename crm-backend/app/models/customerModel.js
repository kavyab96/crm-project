const { default: mongoose } = require("mongoose");
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact_info: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    }


});

const Customers = mongoose.model("Customers", customerSchema);
module.exports = Customers;