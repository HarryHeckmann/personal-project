SELECT f.user_id, f.pet_id, f.name from favorited_pets as f
JOIN users on users.id = f.user_id
WHERE users.id = 1