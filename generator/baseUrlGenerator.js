import { Platform } from "react-native";

let baseUrl = "";

{
  Platform.OS === "android"
    ? (baseUrl = "http://10.0.2.2:5000/ecommerce_api/")
    : (baseUrl = "http://localhost:5000/ecommerce_api/");
}

//"http://10.0.2.2:3000/ecommerce_api/public/api/"

export default baseUrl;
