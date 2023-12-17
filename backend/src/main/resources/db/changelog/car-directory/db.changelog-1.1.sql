-- changeset dzmitry.shushkevich@gmail.com:1
-- comment: /* Insert initial data */

-- Insert values for manufacturer table
INSERT INTO manufacturer (name, country, foundation_date, employees_number)
VALUES
    ('Toyota', 'Japan', '1937-08-28', 359542),
    ('Tesla', 'USA', '2003-07-01', 70757),
    ('Volkswagen', 'Germany', '1937-05-28', 662600),
    ('Renault', 'France', '1899-02-25', 122798);

-- Insert values for car table
INSERT INTO car (model, description, release_date, fuel_efficiency, manufacturer_id)
VALUES
    ('Prius', null, '1997-12-10', 23.5, 1),
    ('Model 3', null, '2017-07-28', 24.4, 2),
    ('Golf', null, '1974-03-29', 18.9, 3),
    ('Clio', null, '1990-06-01', 20.1, 4);
