# Expense-Tracker
# Instructions to setup the project <br />
```sh
1. Download Docker and install in the machine
2. The Report Generation period can be configured using the property 'REPORTS_CRON' in the docker-compose.yml file. The default is 1 Month.
3. From terminal/cmd use the project root path where docker-compose.yml exist
4. Run the following commands
      npm install
      docker-compose up --build --detach
5. Wait for atleast 30 seconds for the API server to initailze and running, launch the url 'http://localhost:3000/api' to access the Swagger UI.
```
# Note: <br />
1.    Used MongoDB as the database for saving the receipts information.
2.    CSV reports can be found in the path 'src/receipts/reports'
3.    Report Generation period is configurable using the property 'REPORTS_CRON' in the docker-compose.yml file
4.    Logging is implemented to log info and error messages
