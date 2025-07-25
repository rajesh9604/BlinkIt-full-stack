import { createContext, useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { handleAddItemCart } from "../store/cartProductSlice";
import AxiosToastError from "../utils/AxiosToastError";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { PriceWithDiscount } from "../utils/PriceWithDiscount";
import { handleAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";

export const GlobalContext = createContext(null);
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [notDiscountTotalPrice, setNotDiscountTotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state?.user);

  const fetchCartItem = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCartItem,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(handleAddItemCart(responseData.data));
        
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  const updateCartItem = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartItemQty,
        data: {
          _id: id,
          qty: qty,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        //toast.success(responseData.message);
        fetchCartItem();
        return responseData;
      }
    } catch (error) {
      AxiosToastError(error);
      return error;
    }
  };
  const deleteCartItem = async (cartId) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: {
          _id: cartId,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItem();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(handleAddItemCart([]));
  };

  const fetchAddress = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAddress,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(handleAddress(responseData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const fetchOrders =async()=>{
    try {
      const response =await Axios({
        ...SummaryApi.getOrderItems,
        data:{

        }
      })
      const {data: responseData}= response
      if(responseData.success){
        dispatch(setOrder(responseData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  useEffect(() => {
    fetchCartItem();
    handleLogOut();
    fetchAddress();
    fetchOrders()
  }, [user]);

  useEffect(() => {
    const qty = cartItem.reduce((preve, curr) => {
      return preve + curr.quantity;
    }, 0);
    setTotalQty(qty);

    const tPrice = cartItem.reduce((preve, curr) => {
      const priceAfterDiscount = PriceWithDiscount(
        curr.productId.price,
        curr.productId.discount
      );
      return preve + priceAfterDiscount * curr.quantity;
    }, 0);
    setTotalPrice(tPrice);

    const notDiscountPrice = cartItem.reduce((preve, curr) => {
      return preve + curr?.productId?.price * curr.quantity;
    }, 0);
    setNotDiscountTotalPrice(notDiscountPrice);
  }, [cartItem]);

  return (
    <GlobalContext.Provider
      value={{
        fetchCartItem,
        updateCartItem,
        deleteCartItem,
        fetchAddress,
        fetchOrders,
        totalPrice,
        totalQty,
        notDiscountTotalPrice,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
