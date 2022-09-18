# Expense-Tracker
# Instructions to set up the project <br />
```sh
1. Download Docker and install it on the machine
2. The Report Generation period can be configured using the property 'REPORTS_CRON' in the docker-compose.yml file. The default is 1 Month.
3. From terminal/cmd use the project root path where docker-compose.yml exist
4. Run the following commands
      npm install
      docker-compose up --build --detach
5. Wait for at least 30 seconds for the API server to initialize and run, and launch the URL 'http://localhost:3000/api' to access the Swagger UI.
```
# Note: <br />
1.    Project has been developed using the NestJs, Typescript and MongoDb
2.    CSV reports can be found in the path 'src/receipts/reports'
3.    Report Generation period is configurable using the property 'REPORTS_CRON' in the docker-compose.yml file
4.    A Cron job runs at every interval configured in step 3 and generates the receipts report and category report.
5.    Logging is implemented to log info and error messages
