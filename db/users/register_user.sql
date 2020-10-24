insert into users(
    email, password
) values (
    ${email}, ${hash}
)
returning email, user_id;