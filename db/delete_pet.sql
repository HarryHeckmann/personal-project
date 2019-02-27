DELETE FROM user_pets
WHERE user_id = $1 AND pet_id = $2
returning *