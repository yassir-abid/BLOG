-- Deploy blog:post_with_category to pg

BEGIN;

CREATE VIEW post_with_category AS
SELECT post.*, category.label AS category
FROM post
JOIN category ON category.id=post.category_id;

COMMIT;
