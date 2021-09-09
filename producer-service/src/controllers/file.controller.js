const FileService = require('../services/file.service');

class FileController {

  constructor() {
    this.service = new FileService();
  }

  async uploadFile(req, res) {
    if (!req.file || !req.file.path) {
      // Bad Request
      return res.status(400).json({
        success: false,
        error: 'File not found'
      });
    }
    try {
      await this.service.uploadFile(req.file);
      // Successfully entered data into queue
      res.status(200).json({
        success: true,
        message: 'Data entered into queue.'
      });
    } catch(error) {
      // Error while reading or queueing data
      res.status(500).json({
        success: false,
        error: 'An error occured. Please try again.'
      });
    }
  }
}

module.exports = FileController