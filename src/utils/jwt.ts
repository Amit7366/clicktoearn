import { TUser } from "@/redux/slice/authSlice";
import { jwtDecode } from "jwt-decode";

// Define the expected structure of the decoded token
interface DecodedToken {
  email: string;
  role: string;
  // Add other fields based on your JWT payload structure
}

export const decodedToken = (token: string): TUser => {
  try {
    // Decode the token into a custom object
    const decoded = jwtDecode<DecodedToken>(token);  // Type-casting to DecodedToken

    // Ensure you get the right user fields (e.g., email, role)
    return {
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    throw new Error("Invalid token specified");
  }
};
