import AddRestaurnat from "../components/AddRestaurnat";
import Header from "../components/Header";
import Restaurants_list from "../components/Restaurants_list";
import { Box } from "@chakra-ui/react";
const Home = () => {
  return (
    <Box width={"70%"} ml={"auto"} mr={"auto"}>
      <Header />
      <AddRestaurnat />
      <Restaurants_list />
    </Box>
  );
};

export default Home;
