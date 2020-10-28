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

create table Orders(
    order_id serial primary key, 
    order_date date,
    order_total int,
    item_id int,
    name varchar(255),
    description varchar(255),
    img text,
    color varchar(50),
    price int
    user_id int,
    constraint fk_users
        foreign key(user_id)
            references Users(user_id)
)