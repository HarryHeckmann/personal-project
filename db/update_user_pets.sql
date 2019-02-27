INSERT INTO user_pets(user_id, pet_name, pet_image, pet_image_exif)
VALUES($1,$2, $3, $4) 
returning *;
