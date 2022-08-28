import axios from "axios";
import { getToken } from "../core/storage";

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

export const deleteProductService = async (product_id) => {
  console.log("[deleteProductService] product_id: ", product_id);
  const token = await getToken();

  try {
    await axios.delete(`${BASE_API_ENDPOINT}products/${product_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("[deleteProductService] error: ", error);
    throw error;
  }
};

export const OrderService = async (payload) => {
  console.log("[deleteProductService] product_id: ", payload);
  const token = await getToken();

  try {
    await axios.post(`${BASE_API_ENDPOINT}onlineOrder`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("[OrderService] error: ", error);
    throw error;
  }
};

export const userRegistration = async (payload, formData) => {
  console.log("[DISPLAY formData]: ", formData);
  console.log("[DISPLAY payload]: ", payload);
  const registration_data = {
    name: formData.name,
    email: formData.email,
    phoneNumber: formData.phoneNumber,
    password: formData.password,
    isAdmin: false,
  };

  try {
    await axios.post(`${BASE_API_ENDPOINT}onlineUser`, registration_data);
  } catch (error) {
    console.log("[userRegistration] error: ", error);
    throw error;
  }
};
