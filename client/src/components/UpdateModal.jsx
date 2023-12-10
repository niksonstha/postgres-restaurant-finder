/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
} from "@chakra-ui/react";
import { restaurantFinder } from "../apis/apis";
import { useContext, useState } from "react";
import { RestaurantsContext } from "../context/RestaurantContext";

const UpdateModal = ({ isOpen, onClose, selectedRestaurant }) => {
  const [updatedName, setUpdatedName] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [updatedPriceRange, setUpdatedPriceRange] = useState("");
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  const updateHandler = async () => {
    try {
      const response = await restaurantFinder.put(`/${selectedRestaurant.id}`, {
        name: updatedName,
        location: updatedLocation,
        price_range: updatedPriceRange,
      });
      console.log(response);
      const updatedRestaurants = restaurants.map((restaurant) => {
        if (restaurant.id === selectedRestaurant.id) {
          return {
            ...restaurant,
            name: updatedName,
            location: updatedLocation,
            price_range: updatedPriceRange,
          };
        }
        return restaurant;
      });

      setRestaurants(updatedRestaurants);
      onClose(); // Close the modal
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Restaurant</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Add the form for updating the restaurant details here */}
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder={selectedRestaurant.name}
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Location</FormLabel>
            <Input
              placeholder={selectedRestaurant.location}
              value={updatedLocation}
              onChange={(e) => setUpdatedLocation(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Price Range</FormLabel>
            <Select
              placeholder={"$".repeat(selectedRestaurant.price_range)}
              _placeholder={{ color: "#040D12" }}
              value={updatedPriceRange}
              onChange={(e) => setUpdatedPriceRange(e.target.value)}
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
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={updateHandler}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateModal;
