-- Verify blog:schema on pg

BEGIN;

SELECT "id", "slug", "title", "excerpt", "content", "picture", "category_id" FROM "post" WHERE false;

SELECT "id", "label", "route" FROM "category" WHERE false;

ROLLBACK;
