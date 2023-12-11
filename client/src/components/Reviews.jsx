/* eslint-disable react/prop-types */
import {
  SimpleGrid,
  Box,
  Text,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  return (
    <SimpleGrid spacing={3} columns={3}>
      {reviews?.map((review) => (
        <Card key={review.id} bgColor={"#5C8374"}>
          <CardHeader>
            <Heading size="md">{review.name}</Heading>
          </CardHeader>
          <CardBody>
            <Text>{review.review}</Text>
          </CardBody>
          <CardFooter>
            <Box>
              <StarRating rating={review.rating} />
            </Box>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default Reviews;
