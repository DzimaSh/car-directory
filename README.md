# Web-App: Car Directory

This web application is a directory of cars and their manufacturers. By default it uses two SQL data sources: a car directory and a manufacturer directory.

## Directory

- Car Directory
- Manufacturer Directory

### Car Directory

The car directory contains the following fields:

- **Model** (text): The name of the car model.
- **Release Date** (date): The date when the car was released.
- **Fuel efficicency** (decimal): The used gas per kilometer.
- **Manufacturer** (reference): This field is used for a reference to the manufacturer directory.

*Note: The `id` values for directories are skipped for readability purposes.*

### Manufacturer Directory

The manufacturer directory contains the following fields:

- **Name** (text): The name of the manufacturer.
- **Country** (text): The country where the manufacturer's headquarters is located.
- **Foundation Date** (date): The date when the manufacturer was founded.
- **Number of Employees** (integer): The number of employees working for the manufacturer.

*Note: The `id` values for directories are skipped for readability purposes.*

## Database Setup

The SQL database is set up with two tables corresponding to the two directories. The 'Manufacturer' field in the 'Car' table is a foreign key referencing the 'Manufacturer' table.

## Contributing

Contributions are welcome. Please open an issue to discuss your idea or submit a pull request.

## Author

Dzmitry Shushkevich
