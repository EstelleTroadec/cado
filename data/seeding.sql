BEGIN;

INSERT INTO
    "user" ("id", "name", "email", "password", "is_registred", "token", "event_id")
VALUES
    (1, 'Yanis', 'yanis@gnail.com', '123456', 'true', 'null', 1),
    (2, 'Anais', 'anais@gnail.com', '654321', 'true', 'null', 1),
    (3, 'Yoann', 'yoann@gnail.com', '456789', 'true', 'null', 1),
    (4, 'Estelle', 'estelle@gnail.com', '987654', 'true', 'null', 1),

INSERT INTO
    "event" ("id", "name", "date", "user_id")
VALUES
    (1, 'Anniversaire en groupe', '03/06/2024'),

INSERT INTO
    "draw" ("id", "giver_id", "receiver_id")
VALUES
    (1, '1', '3'),
    (2, '2', '4'),
    (3, '3', '2'),
    (4, '4', '1'),

INSERT INTO
    "event_user" ("event_id", "user_id")
VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4);


COMMIT;