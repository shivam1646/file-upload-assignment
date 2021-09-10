# Microservices using Node.js/Expess.js, Kafka and PostgreSQL

## Getting Started
1. `sudo docker-compose up --build` or detached mode `sudo docker-compose up --build -d`
2. Create table `docker exec consumer-service npm run db:migrate`

## Produce data
1. Upload file using `curl -k -X POST -F 'file=your_file_path' -v  http://localhost:4000/fileupload` or use Postman with `form-data` option.

## Query data
1. With pagination `http://localhost:4001/employees?limit=10&page=10`
2. With filters `http://localhost:4001/employees?email=bob@bob.com&company=your_company`
