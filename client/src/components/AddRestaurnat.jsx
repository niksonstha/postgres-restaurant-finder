import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { restaurantFinder } from "../apis/apis";
import { RestaurantsContext } from "../context/RestaurantContext";

const AddRestaurnat = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");
  const { addRestaurant } = useContext(RestaurantsContext);

  const submitHandler = async () => {
    try {
      console.log("clicked");
      const response = await restaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      addRestaurant(response.data.data.resturant);
      setPriceRange("");
      setLocation("");
      setName("");
    } catch (error) {
      console.log("Error occurred:", error); // Log the caught error
    }
  };

  return (
    <Box
      bgColor={"#183D3D"}
      padding={"20px"}
      rounded={"20px"}
      width={"50%"}
      ml={"auto"}
      mr={"auto"}
    >
      <FormControl
        isRequired
        display={"flex"}
        flexDirection={"column"}
        gap={5}
        color={"#FAF6F0"}
      >
        <Box>
          <FormLabel>Name</FormLabel>
          <Input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box>
          <FormLabel>Location name</FormLabel>
          <Input
            id="location"
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Box>
        <Box>
          <FormLabel>Price Range</FormLabel>
          <Select
            placeholder="Price Range"
            _placeholder={{ color: "#040D12" }}
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value={"1"} style={{ color: "#040D12" }}>
              $
            </option>
            <option value={"2"} style={{ color: "#040D12" }}>
              $$
            </option>
            <option value={"3"} style={{ color: "#040D12" }}>
              $$$
            </option>
            <option value={"4"} style={{ color: "#040D12" }}>
              $$$$
            </option>
            <option value={"5"} style={{ color: "#040D12" }}>
              $$$$$
            </option>
          </Select>
        </Box>
        <Button
          bgColor={"#9EC8B9"}
          mt={6}
          width={"100px"}
          onClick={submitHandler}
        >
          Add
        </Button>
      </FormControl>
    </Box>
  );
};

export default AddRestaurnat;
