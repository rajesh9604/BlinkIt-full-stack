import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import Divider from "../components/Divider";
import minute_delivery_img from "../assets/minute_delivery.png";
import Best_Prices_Offers_img from "../assets/Best_Prices_Offers.png";
import Wide_Assortment_img from "../assets/Wide_Assortment.png";
import { PriceWithDiscount } from "../utils/PriceWithDiscount";
import AddToCartButton from "../components/AddToCartButton";
const ProductDisplayPage = () => {
  const params = useParams();
  console.log(params);
  let productId = params.product.split("-").slice(-1)[0];
  const [data, setData] = useState({
    name: "",
    image: [],
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(0);
  const imageContainer = useRef();
  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductDetails();
  }, [params]);
  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  return (
    <section className="container mx-auto p-4 grid lg:grid-cols-2 ">
      <div className="">
        <div className="h-full w-full min-h-56 max-h-56 rounded bg-white  lg:min-h-[65vh] lg:max-h-[65vh]">
          <img
            src={data.image[image]}
            className="w-full h-full object-scale-down"
          />
        </div>
        <div className="flex items-center justify-center gap-3 my-2">
          {data.image.map((img, index) => {
            return (
              <div
                key={img + index + "point"}
                className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${
                  index === image && "bg-slate-300"
                }`}
              ></div>
            );
          })}
        </div>
        <div className="grid relative">
          <div
            ref={imageContainer}
            className="flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none"
          >
            {data.image.map((img, index) => {
              return (
                <div
                  className="w-20 h-20 min-h-20 min-w-20 shadow-md cursor-pointer"
                  key={img + index}
                >
                  <img
                    src={img}
                    alt="min-product"
                    onClick={() => setImage(index)}
                    className="w-full h-full object-scale-down"
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full h-full -ml-3 flex justify-between absolute items-center">
            <button
              className="z-10 bg-white p-1 relative rounded-full shadow-lg"
              onClick={handleScrollLeft}
            >
              <FaAngleLeft />{" "}
            </button>
            <button
              className="z-10 bg-white p-1  relative rounded-full shadow-lg"
              onClick={handleScrollRight}
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        <div className="my-4 hidden  lg:grid gap-3 ">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-base">{data.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-base">{data.unit}</p>
          </div>
          {data?.more_details &&
            Object.keys(data?.more_details).map((el, index) => {
              return (
                <div key={el + index + "moreDetails"}>
                  <p className="font-semibold">{el}</p>
                  <p className="text-base">{data?.more_details[el]}</p>
                </div>
              );
            })}
        </div>
      </div>
      <div className="p-4 lg:pl-7 text-base lg:text-lg">
        <p className="bg-green-300 w-fit px-2 rounded-full"> 10 min</p>
        <h2 className="text-lg font-semibold lg:text-3xl">{data.name}</h2>
        <p className="">Unit: {data.unit}</p>
        <Divider />
        <div>
          <p className="">Price</p>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="border border-green-500 px-4 py-2 rounded bg-green-50 w-fit">
              <p className="font-semibold">
                {DisplayPriceInRupees(
                  PriceWithDiscount(data.price, data.discount)
                )}
              </p>
            </div>
            {data.discount && (
              <p className="line-through">{DisplayPriceInRupees(data.price)}</p>
            )}
            {data.discount && (
              <p className="font-bold text-green-600 lg:text-2xl">
                {data.discount}%{" "}
                <span className="text-base text-neutral-500">Discount</span>
              </p>
            )}
          </div>
        </div>
        {data.stock === 0 ? (
          <p className="text-lg text-red-500 my-2">Out of Stock</p>
        ) : (
          // <button className="px-4 py-1 my-4 bg-green-600 hover:bg-green-700 text-white rounded">
          //   Add
          // </button>
          <div className="my-4">
            <AddToCartButton data={data} />
          </div>
        )}
        <h2 className="font-semibold">Why shop from blinkit</h2>
        <div>
          <div className="flex items-center gap-4 my-4">
            <img
              src={minute_delivery_img}
              alt="superfast delivery"
              className="w-20 h-20"
            />
            <div className="text-sm">
              <div className="font-semibold">SuperFast Delivery</div>
              <p>
                get Your Order delivered to your doorstep at the earliest from
                dark stores near you.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 my-4">
            <img
              src={Best_Prices_Offers_img}
              alt="Best Prices offers"
              className="w-20 h-20"
            />
            <div className="text-sm">
              <div className="font-semibold">Best Prices & Offers</div>
              <p>
                Best price destination with offers directly from the
                manufactures.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 my-4">
            <img
              src={Wide_Assortment_img}
              alt="Wide_Assortment"
              className="w-20 h-20"
            />
            <div className="text-sm">
              <div className="font-semibold">Wide_Assortment</div>
              <p>
                Choose from 5000+ products across food personal care,household
                and other category{" "}
              </p>
            </div>
          </div>
        </div>
        {/***only for mobile  */}
        <div className="my-4 grid gap-3 ">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-base">{data.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-base">{data.unit}</p>
          </div>
          {data?.more_details &&
            Object.keys(data?.more_details).map((el, index) => {
              return (
                <div key={el + index + "moreDetails"}>
                  <p className="font-semibold">{el}</p>
                  <p className="text-base">{data?.more_details[el]}</p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
