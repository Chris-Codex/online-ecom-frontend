import axios from "axios";
import { getToken } from "../core/storage";

const BASE_API_ENDPOINT = "http://localhost:5000/ecommerce_api/";
const TOKEN = getToken();

const dummy_data = {
  _id: "630351b8b26c4e77ddf282c1",
  productName: "Lakers Dummy",
  productDescription:
    "Available at a lower price from other sellers that may not offer free Prime delivery.",
  subDescription: "",
  img: "http://10.0.2.2:5000/imagesUpload/uploads/5eefd6e2-1321-4016-ab20-a3bfbffdc851_jpg-1661161912500.jpeg",
  imgs: [],
  trademark: "Clarks Men's",
  price: 400,
  category: {
    _id: "62cad84dfeeaecfac4e0ffec",
    name: "Men's Shoe",
    productIcon: "Shoes-icon",
    color: "#fefefe",
    __v: 0,
    category_id: "62cad84dfeeaecfac4e0ffec",
    id: "62cad84dfeeaecfac4e0ffec",
  },
  keepTrackProducts: 0,
  rating: 0,
  reviews: 0,
  isFeatured: false,
  createdAt: "2022-08-22T09:51:52.650Z",
  __v: 0,
  product_id: "630351b8b26c4e77ddf282c1",
  id: "630351b8b26c4e77ddf282c1",
};

export const updateProductService = async (payload) => {
  const token = await TOKEN;

  console.log("[updateProductSerivce] token: ", token);
  console.log("[updateProductSerivce] payload: ", payload);

  fetch(`${BASE_API_ENDPOINT}products/630351b8b26c4e77ddf282c1`, {
    method: "PUT",
    // headers: {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    // },
    body: JSON.stringify(dummy_data),
  });

  //   fetch(`${BASE_API_ENDPOINT}products/${payload.id}`)
  //     .then((res) => )

  //   try {
  //     const data = await axios.put(
  //       "http://localhost:5000/ecommerce_api/products/630351b8b26c4e77ddf282c1",
  //       dummy_data,
  //       {
  //         headers: {
  //           //   "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //   const data = await axios({
  //     url: `${BASE_API_ENDPOINT}products/${payload.id}`,
  //     method: "PUT",
  //     body: { payload },
  //     headers: {
  //       Authorization: `Bearer ${TOKEN}`,
  //     },
  //   })

  // console.log("[updateProductService] updated data: ", data);
  //   } catch (error) {
  //     console.log("[updateProductService] error: ", error);
  //   }

  // axios.put(`${BASE_API_ENDPOINT}products`)
  //     .then((res) => {

  //     })

  // fetch(`${baseUrlGenerator}products/${item.id}`, {
  //   method: "PUT",
  //   headers: {
  //     // Accept: "application/json",
  //     "Content-Type": "multipart/form-data",
  //     Authorization: `Bearer ${token}`,
  //   },

  //   body: formData,
  // })
  //   .then((res) => res.json())
  //   .then((res) => {
  //     if (res.status == 200 || res.status == 201) {
  //       Toast.show({
  //         type: "success",
  //         position: "top",
  //         text1: "Registration Successful",
  //         text2: "Please Login",
  //         visibilityTime: 3000,
  //         topOffset: 50,
  //       });
  //       setTimeout(() => {
  //         props.navigation.navigate("Products");
  //       }, 500);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log("ERROR", err);
  //   });
  // } else {
  // fetch(`${baseUrlGenerator}products`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //     Authorization: `Bearer ${token}`,
  //   },

  //   body: formData,
  // })
  //   .then((res) => res.json())
  //   .then((res) => {
  //     console.log("RES", res);
  //     if (res.status == 200 || res.status == 201) {
  //       Toast.show({
  //         type: "success",
  //         position: "top",
  //         text1: "Registration Successful",
  //         text2: "Please Login",
  //         visibilityTime: 3000,
  //         topOffset: 50,
  //       });
  //       console.log("PRODUCT ADDED", res);
  //       setTimeout(() => {
  //         props.navigation.navigate("Products");
  //       }, 500);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log("ERROR", err);
  //   });
};
