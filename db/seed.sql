create table MenProduct(
    item_id serial primary key,
    name varchar(255),
    description varchar(255),
    img text,
    color varchar(50),
    price int
)

create table WomenProduct(
    item_id serial primary key,
    name varchar(255),
    description varchar(255),
    img text,
    color varchar(50),
    price int
)

create table Accessories(
    item_id serial primary key,
    name varchar(255),
    description varchar(255),
    img text,
    color varchar(50),
    price int
)

create table Users(
    user_id serial primary key,
    password text,
    email text,
    username varchar(20)
)

create table orders(
    user_firstName varchar(50),
    user_lastName varchar(50),
    user_address varchar(100),
    user_city varchar(100),
    user_state varchar(100),
    user_zip varchar(20),
    user_email text,
    order_id serial primary key,
    order_total_number_items int,
    order_total_price decimal,
    order_date text,
    constraint fk_users
        foreign key (order_id) 
            references users(user_id)
);