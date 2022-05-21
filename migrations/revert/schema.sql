-- Revert blog:schema from pg

BEGIN;

DROP TABLE post, category;

COMMIT;
