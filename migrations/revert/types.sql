-- Revert blog:types from pg

BEGIN;

ALTER TABLE "category"
  DROP CONSTRAINT route_check;

ALTER TABLE "post"
  ALTER COLUMN "slug" TYPE TEXT;

DROP DOMAIN slug;

COMMIT;
