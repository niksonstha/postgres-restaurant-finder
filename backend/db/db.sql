CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id  BIGINT NOT NULL REFERENCES resturant(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT check(rating>=1 and rating <=5)
);


INSERT INTO reviews (restaurant_id,name,review,rating) VALUES (95,'nikson','this is good',3);

SELECT * FROM resturant LEFT JOIN (SELECT restaurant_id,count(*),trunc(AVG(rating),1) AS average_rating FROM reviews group by restaurant_id) reviews on resturant.id = reviews.restaurant_id;


SELECT * FROM reviews;