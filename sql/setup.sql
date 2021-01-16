DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS links CASCADE;
DROP TABLE IF EXISTS tips;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE links (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  url TEXT NOT NULL 
);

CREATE TABLE tips (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tip TEXT NOT NULL
);