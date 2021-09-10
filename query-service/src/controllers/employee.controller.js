const EmployeeService = require('../services/employee.service');

class EmployeeController {

  constructor() {
    this.service = new EmployeeService();
  }

  async getAll(req, res) {
    try {
      const data = await this.service.getAll(req.query);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ data: [] });
    }
  }

}

module.exports = EmployeeController
