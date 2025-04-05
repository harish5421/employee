const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  sex: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  salary: { type: Number, required: true },
  address: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);