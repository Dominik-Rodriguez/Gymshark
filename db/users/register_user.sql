insert into users(
    email, password, first_name, last_name, address, city, country, state
) values (
    $1, $2, $3, $4, $5, $6, $7, $8
)
returning email, user_id;