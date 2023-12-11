/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { restaurantFinder } from "../apis/apis";
// import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReviews from "../components/AddReviews";
import StarRating from "../components/StarRating";
const RestaurantDetail = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const restaurantDetail = async () => {
      try {
        const response = await restaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    restaurantDetail();
  }, []);

  return (
    <Box width={"70%"} mr={"auto"} ml={"auto"}>
      <Heading
        color={"white"}
        fontSize={"5rem"}
        letterSpacing={8}
        textAlign={"center"}
      >
        {selectedRestaurant.resturant?.name}
      </Heading>
      <Box mb={5} textAlign={"center"}>
        <StarRating rating={selectedRestaurant.resturant?.average_rating} />
      </Box>
      <Reviews reviews={selectedRestaurant.reviews} />
      <AddReviews id={id} />
    </Box>
  );
};

export default RestaurantDetail;
