-- Verify blog:post_with_category on pg

BEGIN;

SELECT * FROM post_with_category
WHERE false;

ROLLBACK;
