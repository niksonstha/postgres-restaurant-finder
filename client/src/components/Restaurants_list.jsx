import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { restaurantFinder } from "../apis/apis";
import { useContext, useEffect, useState } from "react";
import { RestaurantsContext } from "../context/RestaurantContext";
import UpdateModal from "./UpdateModal";

const Restaurants_list = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRestaurant, setSelectedRestaurant] = useState({
    id: "",
    name: "",
    location: "",
    price_range: "",
  });

  const handleUpdate = (id, name, location, price_range) => {
    onOpen();
    setSelectedRestaurant({ id, name, location, price_range });
  };

  const deleteHandler = async (id) => {
    try {
      await restaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const response = await restaurantFinder.get("/");

        setRestaurants(response.data.data.resturants);
      } catch (error) {
        console.log(error);
      }
    };
    getRestaurants();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <TableContainer width={"100%"} mt={10} mb={10}>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Location</Th>
              <Th>Price Range</Th>
              <Th>Update</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {restaurants &&
              restaurants.map((restaurant, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  <Td>{restaurant.name}</Td>
                  <Td>{restaurant.location}</Td>
                  <Td>{"$".repeat(restaurant.price_range)}</Td>
                  <Td>
                    <Button
                      onClick={() =>
                        handleUpdate(
                          restaurant.id,
                          restaurant.name,
                          restaurant.location,
                          restaurant.price_range
                        )
                      }
                    >
                      Update
                    </Button>
                  </Td>
                  <Td>
                    <Button onClick={() => deleteHandler(restaurant.id)}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <UpdateModal
        isOpen={isOpen}
        onClose={onClose}
        selectedRestaurant={selectedRestaurant}
      />
    </>
  );
};

export default Restaurants_list;
