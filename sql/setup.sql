DROP TABLE IF EXISTS links;
DROP TABLE IF EXISTS tips;

CREATE TABLE links (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  link TEXT NOT NULL 
);

CREATE TABLE tips (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tip TEXT NOT NULL
);