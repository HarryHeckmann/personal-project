INSERT INTO users
(username, hash, firstname, lastname, city, profile_img, email)
VALUES
($1, $2, $3, $4, $5, $6, $7)
returning *;