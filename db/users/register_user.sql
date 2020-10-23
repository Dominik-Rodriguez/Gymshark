insert into users(
    email, username, password
) values (
    ${email}, ${username}, ${hash}
)
returning username, id;