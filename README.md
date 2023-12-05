# Web-App: Car Directory

This web application is a directory of cars and their manufacturers. By default, it uses two SQL data sources: a **Car Directory** and a **Manufacturer directory**.

## Directories

- Car Directory
- Manufacturer Directory

*Note: The `id` values for directories are skipped for readability purposes.*

### Car Directory

The car directory contains the following fields:

- **Model** (text): The name of the car model.
- **Release Date** (date): The date when the car was released.
- **Fuel efficicency** (decimal): The used gas per kilometer.
- **Manufacturer** (reference): This field is used for a reference to the manufacturer directory.

### Manufacturer Directory

The manufacturer directory contains the following fields:

- **Name** (text): The name of the manufacturer.
- **Country** (text): The country where the manufacturer's headquarters is located.
- **Foundation Date** (date): The date when the manufacturer was founded.
- **Number of Employees** (integer): The number of employees working for the manufacturer.


## Running the Application with Docker Compose

To start the application using Docker Compose, follow these steps:

1. Ensure Docker and Docker Compose are installed on your machine.
2. Clone the repository: `git clone <repository-url>`
3. Navigate to the project directory: `cd <project-directory>`
4. (Optional) Adjust environment variables changing `*.env` files placed in `provision\docker\env ` directory
5. Run the following command to start the application:
   ```bash
   docker-compose up -d
   ```

Access the application at http://localhost:8080 in your browser.

## Database Setup

The SQL database is set up with two tables corresponding to the two directories. The `Manufacturer` field in the **Car** table is a foreign key referencing the **Manufacturer** table.

SQL migrations are located in `backend/src/main/resources/db/changelog/car-directory/db.changelog-1.0.sql`. These migrations contain the necessary database changes to set up the initial schema for the Car Directory.

The application is configured to automatically apply these migrations upon a successful server startup. Upon starting the server, the migrations will be executed to ensure the database schema aligns with the application requirements.

To ensure the migrations are applied:

1. Start the application using Docker Compose or your preferred method.
2. Upon successful server startup, the application will automatically execute the SQL migrations.
3. Connect to the created `db.local` container and check that all the tables are created using `psql`.

#### Checking Migrations with psql

After you've started your application and the migrations have been applied, you can check the status of these migrations using `psql`. Here are the steps:

1. Connect to your database using `psql`. You might need to provide the host, port, username, and password depending on your configuration. The command might look like this
   ```bash
   psql -h localhost -p 5432 -U car_directory
   ```
2. Once connected, switch to your database using the
   ```bash
   \c car_directory
   ```
3. Now you can check the status of your migrations. Since you're using Liquibase, you can check the `databasechangelog` table to see which migrations have been applied:
   ```sql
   SELECT * FROM databasechangelog;
   ```

Remember to verify the migration logs or any application logs that indicate the status of migration execution to ensure the database schema is set up correctly.

*Note: `car_directory` is the default label for both the PostgreSQL username and database name. If you have provided other environment variables, you should replace `car_directory` with your input.*

## Contributing

Contributions are welcome. Please open an issue to discuss your idea or submit a pull request.

## Author

Dzmitry Shushkevich
