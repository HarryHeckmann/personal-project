-- INSERT INTO users(profile_img_exif, profile_img, firstname, lastname, city)
-- VALUES($2, $3, $4, $5, $6) 
-- WHERE id = $1
-- returning *;

UPDATE users
SET profile_img_exif = $2,
    profile_img = $3,
    firstname = $4,
    lastname = $5,
    city = $6,
    email = $7
WHERE 
    id = $1
returning *;