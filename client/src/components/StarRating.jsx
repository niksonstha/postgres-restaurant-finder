/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    let starIcon;
    if (i <= rating) {
      starIcon = <FaStar key={i} />;
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      starIcon = <FaStarHalfAlt key={i} />;
    } else {
      starIcon = <FaRegStar key={i} />;
    }
    stars.push(starIcon);
  }
  return (
    <Box color={"gold"} display={"flex"}>
      {stars}
    </Box>
  );
};

export default StarRating;
