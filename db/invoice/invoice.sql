insert into orders (user_firstname, user_lastname, user_address, user_city, user_state, user_zip, user_email, order_total_number_items, order_total_price, order_date)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
returning order_id;