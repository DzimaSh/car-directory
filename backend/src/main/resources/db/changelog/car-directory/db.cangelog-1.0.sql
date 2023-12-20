-- changeset dzmitry.shushkevich@gmail.com:1
-- comment: Initialize database

-- Manufacturer Directory Table
CREATE SEQUENCE IF NOT EXISTS manufacturer_id_seq
    INCREMENT BY 1
    START WITH 1;
CREATE TABLE manufacturer
(
    id                BIGINT PRIMARY KEY,
    name              VARCHAR(100) UNIQUE NOT NULL,
    country           VARCHAR(100),
    foundation_date   DATE,
    employees_number  INT
);

ALTER TABLE manufacturer ALTER id
    SET DEFAULT nextval('manufacturer_id_seq');

-- Car Directory Table
CREATE SEQUENCE IF NOT EXISTS car_id_seq
    INCREMENT BY 1
    START WITH 1;
CREATE TABLE car
(
    id              BIGINT PRIMARY KEY,
    model           VARCHAR(20) NOT NULL,
    description     VARCHAR(100),
    release_date    TIMESTAMP WITHOUT TIME ZONE,
    fuel_efficiency REAL,
    manufacturer_id BIGINT REFERENCES manufacturer(id) ON DELETE SET NULL
);

ALTER TABLE car ALTER id
    SET DEFAULT nextval('car_id_seq');
