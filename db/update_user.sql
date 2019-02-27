INSERT INTO users(profile_img_exif, profile_img, firstname, lastname, city)
VALUES($2, $3, $4, $5, $6) 
WHERE
id = $1
returning *;