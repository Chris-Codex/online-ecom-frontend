import axios from "axios";
import { getToken } from "../core/storage";
import Toast from "react-native-toast-message";

const BASE_API_ENDPOINT = "http://10.0.2.2:5000/ecommerce_api/";

export const updateProductService = async (payload, formData) => {
  const token = await getToken();

  const product_data = {
    _id: payload._id,
    productName: formData.productName,
    productDescription: formData.productDescription,
    subDescription: payload.subDescription,
    img: formData.img,
    imgs: formData.imgs,
    trademark: formData.trademark,
    price: formData.price,
    category: formData.category,
    keepTrackProducts: formData.keepTrackProducts,
    rating: payload.rating,
    reviews: payload.reviews,
    isFeatured: payload.isFeatured,
    createdAt: payload.createdAt,
    __v: payload.__v,
    product_id: payload.product_id,
    id: payload.id,
  };

  try {
    await axios.put(
      `${BASE_API_ENDPOINT}products/${payload.id}`,
      product_data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};


