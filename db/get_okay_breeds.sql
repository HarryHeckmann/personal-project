SELECT * FROM animals 
WHERE 
    type = 'dog' AND 
    friendly_dogs = $1 AND
    friendly_pets = $2 AND
    affection BETWEEN (($3)-1) AND (($3)+1) AND
    size BETWEEN (($4)-1) AND (($4)+1) AND
    grooming BETWEEN (($5)-1) AND (($5)+1) AND
    vocality BETWEEN (($6)-1) AND (($6)+1) AND
    energy BETWEEN (($7)-1) AND (($7)+1) AND
    training BETWEEN (($8)-1) AND (($8)+1) AND
    exercise BETWEEN (($9)-1) AND (($9)+1)  
    ORDER BY
        breed ASC


    -- size >= ($4-1) and size <= $4+1 AND 
    -- grooming >= ($5-1) and grooming <= $5+1 AND 
    -- vocality >= ($6-1) and vocality <= $6+1 AND 
    -- energy >= ($7-1) and energy <= $7+1 AND 
    -- training >= ($8-1) and training <= $8+1 AND 
    -- exercise >= ($9-1) and exercise <= $9+1


    -- size = $4 AND
    -- grooming = $5 AND
    -- vocality = $6 AND
    -- energy = $7 AND
    -- training = $8 AND
    -- exercise = $9 