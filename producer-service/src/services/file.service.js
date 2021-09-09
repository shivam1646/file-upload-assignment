const fs = require('fs');
const log = require('loglevel');
const csv = require('csv-parser');
const { Kafka } = require('kafkajs');

const config = require('../config');

class FileService {

  constructor() {
    const options = {
      clientId: config.KAFKA.CLIENT_ID,
      brokers: config.KAFKA.BROKERS
    };
    log.setLevel('INFO');
    this.kafka = new Kafka(options);
    this.producer = this.kafka.producer();
  }

  async uploadFile(file) {
    const readStream = fs.createReadStream(file.path).pipe(csv());

    await this.producer.connect();

    return new Promise((resolve, reject) => {
      readStream.on('data', async(data) => {
        await this._queueMessage(data);
      });
      readStream.on('end', () => {
        this.producer.disconnect();
        resolve('success');
      });
      readStream.on('error', () => {
        this.producer.disconnect();
        reject('error');
      });
    });
  }

  async _queueMessage(data) {
    log.info("Entering data into queue...");

    await this.producer.send({
      topic: config.KAFKA.TOPIC,
      messages: _prepareMessage(data),
    });
  }
}

module.exports = FileService;

const _prepareMessage = data => {
  try {
    return [{ value: JSON.stringify(data) }];
  } catch (err) {
    return [];
  }
}