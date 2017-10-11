UPDATE users
SET lastname = $2, firstname=$3, role=$4
WHERE authid = $1;
