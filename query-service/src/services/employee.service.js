const EmployeeRepository = require('../repositories/employee.repository');
const config = require('../config');

class EmployeeService {

  constructor() {
    this.repository = new EmployeeRepository();
  }

  async getAll(query) {
    let { page, limit, ...filters } = query;
    page = parseInt(page) ? page - 1 : 0;
    limit = parseInt(limit) || config.DB.DEFAULT_LIMIT_SIZE;

    return await this.repository.getAll(limit, page * limit, filters);
  }
}

module.exports = EmployeeService;