import Employee from '../models/Employee.js'
import LeaveApplication from '../models/leaveApplication.js';

//Create leave
//POST /api/leave

export const createLeave = async (req, res) => {
    try {
        const session = req.session;
        const employee = await Employee.findOne({ userId: session.userId })
        if (!employee) return res.status(404).json({ error: "Employee Not Found" });

        if (employee.isDeleted) {
            return res.status(403).json({
                error: "Your Account Is Deactivated. You Cannot Apply For Leave"
            })
        }

        const { type, startDate, endDate, reason } = req.body;
        if (!type || !startDate || !endDate || !reason) {
            return res.status(400).json({ error: "Missing Fields" })
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (new Date(startDate) <= today || new Date(endDate) <= today) {
            return res.status(400).json({ error: "Leave Date Must Be In The Future" })
        }


        if (new Date(endDate) < new Date(startDate)) {
            return res.status(400).json({ error: "End Date Cannot Be Before Start Date" })
        }

        const leave = await LeaveApplication.create({
            employeeId: employee._id,
            type,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            reason,
            status: "PENDING"
        })

        return res.json({ success: true, data: leave })
    } catch (error) {
        return res.status(500).json({ error: "Failed To Create Leave" })
    }
}


//GET leave
//GET /api/leave

export const getLeave = async (req, res) => {
    try {
        const session = req.session
        const isAdmin = session.role === "ADMIN"
        if (isAdmin) {
            const status = req.query.status
            const where = status ? { status } : {}
            const leaves = await LeaveApplication.find(where).
                populate("employeeId").sort({ createdAt: -1 })
            const data = leaves.map((l) => {
                const obj = l.toObject();
                return {
                    ...obj,
                    id: obj._id.toString(),
                    employee: obj.employeeId,
                    employeeId: obj.employeeId?._id?.toString()
                }
            })

            return res.json({ data })
        } else {
            const employee = await Employee.findOne({ userId: session.userId }).lean();
            if (!employee) return res.status(404).json({ error: "Employee Not Found" })
            const leaves = await LeaveApplication.find({employeeId: employee._id}).sort({createdAt : -1})
            return res.json({
                data: leaves,
                employee: {...employee, id: employee._id.toString()}
            })
        }
    } catch (error) {
        return res.status(500).json({ error: "Failed To Get Leave" })
    }
}


//Update leave status
//PATCH /api/leave/:id

export const updateLeaveStatus = async (req, res) => {
    try {
        const {status} = req.body;
        if(!["APPROVED", "REJECTED", "PENDING"].includes(status)) {
            return res.status(400).json({ error: "Invalid Status" })
        }
        const leave = await LeaveApplication.findByIdAndUpdate(
            req.params.id, 
            {status}, 
            {new: true}
        )
        if(!leave) return res.status(404).json({ error: "Leave Not Found" })
        return res.json({success: true, data: leave})
    } catch (error) {
        return res.status(500).json({ error: "Failed To Update Leave Status" })
    }
}