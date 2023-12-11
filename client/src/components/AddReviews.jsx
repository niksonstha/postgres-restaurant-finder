/* eslint-disable react/prop-types */
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { restaurantFinder } from "../apis/apis";

const AddReviews = ({ id }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await restaurantFinder.post(`/${id}/addReviews`, {
        name,
        review,
        rating,
      });
      window.location.reload();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    setName("");
    setRating("");
    setReview("");
  };

  return (
    <Box>
      <FormControl isRequired>
        <FormLabel color={"white"}>First name</FormLabel>
        <Input
          placeholder="First name"
          _placeholder={{ color: "white" }}
          color={"white"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel color={"white"}>Rating</FormLabel>
        <Select
          color={"white"}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option
            value="1"
            style={{
              color: "black", // Set the text color of options
            }}
          >
            1
          </option>
          <option
            value="2"
            style={{
              color: "black", // Set the text color of options
            }}
          >
            2
          </option>
          <option
            value="3"
            style={{
              color: "black", // Set the text color of options
            }}
          >
            3
          </option>
          <option
            value="4"
            style={{
              color: "black", // Set the text color of options
            }}
          >
            4
          </option>
          <option
            value="5"
            style={{
              color: "black", // Set the text color of options
            }}
          >
            5
          </option>
        </Select>
      </FormControl>

      <FormControl isRequired mt={4}>
        <FormLabel color={"white"}>Review</FormLabel>
        <Textarea
          placeholder="Your review"
          _placeholder={{ color: "white" }}
          color={"white"}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </FormControl>

      <Button onClick={handleSubmit} colorScheme="blue" mt={4}>
        Submit
      </Button>
    </Box>
  );
};

export default AddReviews;
