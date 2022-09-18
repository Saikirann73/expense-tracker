# Expense-Tracker
# Instructions to setup the project <br />
```sh
1. Download Docker and install in the machine
2. The Report Generation period can be configured using the property 'REPORTS_CRON' in the docker-compose.yml file. The default is 1 Month.
3. From terminal/cmd use the project root path where docker-compose.yml exist
4. Run the following commands
      docker-compose build
      docker-compose up -d
5. After the API server is up and running, launch the url 'http://localhost:3000/api' to access the Swagger UI.
```
# Points considered during the development <br />
1.	Used MongoDB as the database for saving the receipts information.
2.  CSV reo
