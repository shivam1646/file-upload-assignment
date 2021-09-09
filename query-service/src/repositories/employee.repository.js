const db = require('../db');
const config = require('../config');

class EmployeeRepository {

  constructor() {
    this.db = db;
  }

  async getAll(limit, offset, filters) {
    const [{count}] = await this._getModel(filters).count();
    const data = await this._getModel(filters).offset(offset).limit(limit);

    const pages = Math.ceil(count / limit);
    const page = Math.ceil(offset / limit) + 1;

    return {
      data,
      pagination: {
        total: count,
        page,
        pages
      }
    }
  }

  _getModel(filters) {
    return this.db('employee').where(function() {
      config.DB.FILTER_COLUMN_LIST.forEach((col, index) => {
        if (!filters[col]) { 
          return;
        }
        index === 0
        ? this.where(col, 'like', `%${filters[col]}%`)
        : this.orWhere(col, 'like', `%${filters[col]}%`);
      });
    });
  }
}

module.exports = EmployeeRepository;