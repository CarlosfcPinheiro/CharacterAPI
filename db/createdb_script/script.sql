CREATE SCHEMA charapi;
SET search_path TO charapi;

CREATE TABLE IF NOT EXISTS "user"(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(20) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(20),

    created_at timestamp DEFAULT current_timestamp
);

CREATE TYPE HEAD AS ENUM('Triangle', 'Square', 'Circle');
CREATE TYPE ACCESSORY AS ENUM('Glasses', 'Moustache', 'Hat');
CREATE TYPE ITEM AS ENUM('Cane', 'Staff', 'Paper');

CREATE TABLE IF NOT EXISTS char(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userid UUID NOT NULL,
    charname VARCHAR(20) NOT NULL,
    head HEAD NOT NULL,
    accessory ACCESSORY NOT NULL,
    item ITEM NOT NULL,
    created_at timestamp DEFAULT current_timestamp,

    CONSTRAINT fk_userid FOREIGN KEY (userid) REFERENCES "user" (id)
);