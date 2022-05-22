-- Deploy blog:schema to pg

BEGIN;

CREATE TABLE "category" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label" TEXT NOT NULL UNIQUE,
    "route" TEXT NOT NULL UNIQUE
);

CREATE TABLE "post" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "slug" TEXT NOT NULL UNIQUE,
    "title" TEXT NOT NULL UNIQUE,
    "excerpt" TEXT,
    "content" TEXT,
    "picture" TEXT DEFAULT 'https://cdn.pixabay.com/photo/2014/06/11/17/00/food-366875_960_720.jpg',
    "category_id" INT NOT NULL REFERENCES "category"("id")
);

COMMIT;
