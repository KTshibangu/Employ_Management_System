


// Get employees
// GET /api/employees

export const getEmployees = async (req, res) => {
    try {
        const {department} = req.query;
        const where = {};
        if(department) where.department = department;

        const employees = (await Employee.find(where)).toSorted({createdAt: -1}).populate("userId", "email role").lean();
    } catch (error) {
        
    }    
}

// Create employee
// POST /api/employees
export const createEmployees = async (req, res) => {
    
}

// Update employee
// PUT /api/employees/:id
export const updateEmployees = async (req, res) => {
    
}

// Delete employee
// DELETE /api/employees/:id
export const deleteEmployees = async (req, res) => {
    
}