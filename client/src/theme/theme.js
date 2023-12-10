import { extendTheme } from "@chakra-ui/react";

// Create a custom theme
export const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#040D12", // Change this value to your desired background color
        fontFamily: "Poppins, sans-serif",
      },
      tr: {
        th: {
          color: "blue", // Change this value to your desired color for th elements
          // Additional styles for th elements can be added here
        },
      },
      td: {
        color: "white", // Change this value to your desired color for tr elements
        // Additional styles for tr elements can be added here
      },
      fonts: {
        body: "Poppins, sans-serif",
      },
    },
  },
});
