INSERT INTO favorited_pets(user_id, pet_id, name)
VALUES($1,$2, $3) 
returning *;
