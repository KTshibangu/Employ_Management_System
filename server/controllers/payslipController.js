import Payslip from "../models/Payslip";

// Create payslip
//POST /api/payslip
export const createPayslip = async (req, res) => {

}

// GET payslip
//GET /api/payslip
export const getPayslips = async (req, res) => {
    try {
        const { employeeId, month, year, basicSalary, allowances, deductions } = req.body;

        if (!emplloyeeId || !month || !year || !basicSalary) {
            return res.status(400).json({ error: "Missing fields" })
        }

        const netSalary = Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);

        const payslip = await Payslip.create({
            employeeId,
            month: Number(month),
            year: Number(year),
            basicSalary: Number(basicSalary),
            allowances: Number(allowances || 0),
            deductions: Number(deductions || 0),
            netSalary
        })
        return res.json({ success: true, data: payslip })
    } catch (error) {
        return res.status(500).json({error : "Failed To Create Payslip"})
    }
}

// GET payslip by Id
//GET /api/payslip:id
export const getPayslip = async (req, res) => {

}