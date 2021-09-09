const db = require('../db');

class EmployeeRepository {

  constructor() {
    this.db = db;
  }

  async insert(employee) {
    await this.db('employee')
      .insert({
        name: employee['Employee Name'],
        phone: employee['Phone Number'],
        email: employee['Email Address'],
        company: employee['Company']
      });
  }
}

module.exports = EmployeeRepository;