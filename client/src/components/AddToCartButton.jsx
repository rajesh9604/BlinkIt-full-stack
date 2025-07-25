import React from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const [isAvailable, setIsAvailable] = useState(false);
  const [qty, setQty] = useState(0);
  const [cartItemsDetails, setCartItemsDetails] = useState();
  const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext();
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addToCart,
        data: {
          productId: data?._id,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) {
          fetchCartItem();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const increaseQty = async(e) => {
    e.preventDefault();
    e.stopPropagation();
    const response = await updateCartItem(cartItemsDetails?._id, qty + 1);
    if(response.success){
      toast.success("Item added")
    }
  };
  const decreaseQty = async(e) => {
    e.preventDefault();
    e.stopPropagation();
    if (qty === 1) {
      deleteCartItem(cartItemsDetails?._id);
      
    } else {
      const response =await updateCartItem(cartItemsDetails?._id, qty - 1);
      if(response.success){
      toast.success("Item removed")
    }
    }
  };

  //check the item in cart or not
  useEffect(() => {
    const checkingItem = cartItem.some(
      (item) => item.productId._id === data._id
    );
    setIsAvailable(checkingItem);
    const product = cartItem.find((item) => item.productId._id === data._id);
    setQty(product?.quantity);
    setCartItemsDetails(product);
  }, [data, cartItem]);

  return (
    <div className="w-full max-w-[150px]">
      {isAvailable ? (
        <div className="flex w-full h-full">
          <button
            onClick={decreaseQty}
            className="bg-green-600 hover:bg-green-700 text-white flex-1 w-full  p-1 rounded flex items-center justify-center"
          >
            {<FaMinus />}
          </button>
          <p className="flex-1 w-full font-semibold px-1 flex items-center justify-center">{qty}</p>
          <button
            onClick={increaseQty}
            className="bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center"
          >
            {<FaPlus />}
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded"
        >
          {loading ? <Loading /> : "Add"}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
