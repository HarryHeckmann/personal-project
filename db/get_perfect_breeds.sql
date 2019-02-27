-- SELECT * FROM animals 
-- WHERE 
--     type = 'dog' AND 
--     friendly_dogs = $1 AND
--     friendly_pets = $2 AND
--     affection = $3 AND
--     size = $4 AND
--     grooming = $5 AND
--     vocality = $6 AND
--     energy = $7 AND
--     training = $8 AND
--     exercise = $9 
-- ORDER BY
--     breed ASC

    SELECT friendly_dogs, friendly_pets, affection, size, grooming, vocality, energy, training, exercise FROM animals 
WHERE 
    type = 'dog' AND 
    friendly_dogs = $1 AND
    friendly_pets = $2 AND
    affection = $3 AND
    size = $4 AND
    grooming = $5 AND
    vocality = $6 AND
    energy = $7 AND
    training = $8 AND
    exercise = $9 
-- ORDER BY
--     breed ASC