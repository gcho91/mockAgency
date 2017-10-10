INSERT into users
(authid)
VALUES ($1)
returning *;
