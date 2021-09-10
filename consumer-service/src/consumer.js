const log = require('loglevel');
const { Kafka } = require('kafkajs');

const config = require('./config');
const EmployeeRepository = require('./repositories/employee.repository');

class Consumer {

  constructor() {
    const options = {
      clientId: config.KAFKA.CLIENT_ID,
      brokers: config.KAFKA.BROKERS
    };
    const consumerOptions = {
      groupId: config.KAFKA.CONSUMER.GROUP_ID,
      maxBytesPerPartition: config.KAFKA.CONSUMER.MAX_BYTES_PER_PARTITION,
      maxBytes: config.KAFKA.CONSUMER.MAX_BYTES
    };
    log.setLevel('INFO');
    this.kafka = new Kafka(options);
    this.consumer = this.kafka.consumer(consumerOptions);
    this.employeeRepository = new EmployeeRepository();
  }

  async startConsumer() {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: config.KAFKA.TOPIC });

      log.info('Consumer is listening');

      await this.consumer.run({ eachBatch: this._processBatch.bind(this) });
    } catch (error) {
      log.error('Error occured');
    }
  }

  async _processBatch({ batch, resolveOffset, heartbeat }) {
    const { topic } = batch;
    this.consumer.pause([{ topic }]);

    for (let message of batch.messages) {
      try {
        const employeeDetails = JSON.parse(message.value);
        await this.employeeRepository.insert(employeeDetails);

        log.info(`Employee with name - ${employeeDetails['Employee Name']} created.`);
      } catch (error) {
        log.error('Not able to create employee.');
      }

      await resolveOffset(message.offset);
      await heartbeat();
    }

    this.consumer.resume([{ topic }]);
  }

}

module.exports = Consumer;
