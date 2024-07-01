-- Revert cado:create-table from pg

BEGIN;

DROP TABLE IF EXISTS "user", "event", "draw", "event_user";


COMMIT;
