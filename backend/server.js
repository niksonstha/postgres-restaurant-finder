const db = require("./db");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//? get all resturants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const restaurantRatingData = await db.query(
      "SELECT * FROM resturant LEFT JOIN (SELECT restaurant_id,count(*),trunc(AVG(rating),1) AS average_rating FROM reviews group by restaurant_id) reviews on resturant.id = reviews.restaurant_id"
    );

    res.status(200).json({
      status: "success",
      results: restaurantRatingData.rows.length,
      data: {
        resturants: restaurantRatingData.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//? get a resturant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await db.query(
      "SELECT * FROM resturant LEFT JOIN (SELECT restaurant_id,count(*),trunc(AVG(rating),1) AS average_rating FROM reviews group by restaurant_id) reviews on resturant.id = reviews.restaurant_id WHERE id = $1",
      [id]
    );
    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [id]
    );
    console.log(reviews);
    res.status(200).json({
      status: "success",
      data: {
        resturant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//? Create resturant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const { name, location, price_range } = req.body;
    const result = await db.query(
      "INSERT INTO resturant (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [name, location, price_range]
    );
    res.status(200).json({
      status: "success",
      data: {
        resturant: result.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//? Update resturant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  const { name, location, price_range } = req.body;
  const { id } = req.params;
  try {
    const result = await db.query(
      "UPDATE resturant SET name = $1, location = $2, price_range = $3 where id = $4 RETURNING *",
      [name, location, price_range, id]
    );
    res.status(200).json({
      status: "success",
      data: {
        resturant: result.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//? Delete resturant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("DELETE FROM resturant WHERE id = $1", [id]);
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

//? add reviews
app.post("/api/v1/restaurants/:id/addReviews", async (req, res) => {
  const { id } = req.params;
  const { name, review, rating } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO reviews (restaurant_id,name,review,rating) VALUES ($1,$2,$3,$4) RETURNING *",
      [id, name, review, rating]
    );
    console.log(result.rows[0]);
    res.status(200).json({
      status: "ok",
      reviews: result.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("App is running in port: ", process.env.PORT);
});
