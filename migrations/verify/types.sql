-- Verify blog:types on pg

BEGIN;

INSERT INTO "category" ("label", "route")
VALUES ('test', '/truc/MACHIN');

INSERT INTO "post" ("slug", "title", "excerpt", "content", "category_id")
VALUES('123-test','test', 'test', 'test', 1);

ROLLBACK;
