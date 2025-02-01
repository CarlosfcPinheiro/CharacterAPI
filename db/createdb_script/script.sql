CREATE SCHEMA IF NOT EXISTS charapi;
SET search_path TO charapi;

CREATE TABLE IF NOT EXISTS "user"(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(60) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(20),
    char_count INT NOT NULL,

    created_at timestamp DEFAULT current_timestamp
);

CREATE TYPE FACE AS ENUM('Sad', 'Happy', 'Angry', 'Neutral');
CREATE TYPE HEAD AS ENUM('Triangle', 'Square', 'Circle');
CREATE TYPE ACCESSORY AS ENUM('Glasses', 'Moustache', 'Hat');
CREATE TYPE ITEM AS ENUM('Cane', 'Staff', 'Paper');

CREATE TABLE IF NOT EXISTS char(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userid UUID NOT NULL,
    charname VARCHAR(20) NOT NULL,
    face_type FACE NOT NULL,
    head_type HEAD NOT NULL,
    accessory_type ACCESSORY NOT NULL,
    item_type ITEM NOT NULL,
    created_at timestamp DEFAULT current_timestamp,

    CONSTRAINT fk_userid FOREIGN KEY (userid) REFERENCES "user" (id)
);