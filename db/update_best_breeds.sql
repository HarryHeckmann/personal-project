UPDATE users
SET best_breeds = $2
WHERE
 id = $1
returning *;