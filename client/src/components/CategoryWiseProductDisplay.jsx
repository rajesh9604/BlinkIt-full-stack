import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ValidUrlConvert } from "../utils/ValidUrlConvert";
const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const containerRef = useRef();
  const loadingCardNumber = new Array(6).fill(null);
  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id: id,
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
    fetchCategoryWiseProduct();
  }, []);
  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200;
  };
  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200;
  };
  
  
  
   
  
  const handleRedirectProductList = () => {
    
    
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category?.some(c=>{
        return c._id == id
      })
      return filterData ? true : null
    });
   

    const url = `/${ValidUrlConvert(name)}-${id}/${ValidUrlConvert(
      subcategory?.name
    )}-${subcategory?._id}`;
    
    return url
    
  };
  const redirectURL =handleRedirectProductList()
  return (
    <div>
      <div className=" container mx-auto p-4 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-lg md: text-xl">{name}</h3>
        <Link  to={redirectURL} className="text-green-600 hover:text-green-400">
          See All
        </Link>
      </div>
      <div className="relative flex items-center">
        <div
          className="flex  gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth "
          ref={containerRef}
        >
          {loading &&
            loadingCardNumber.map((_, index) => {
              return (
                <CardLoading key={index + "CategoryWiseProductDisplay123"} />
              );
            })}
          {data.map((p, index) => {
            return (
              <CardProduct
                key={p._id + index + "CategoryWiseProductDisplay"}
                data={p}
              />
            );
          })}
        </div>
        <div className="w-full left-0 right-0 container mx-auto px-2 absolute hidden  lg:flex justify-between max-w-full">
          <button
            onClick={handleScrollLeft}
            className="z-10 relative  bg-white hover:bg-gray-100 shadow-lg p-2 rounded-full text-lg"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleScrollRight}
            className="z-10 relative bg-white hover:bg-gray-100 shadow-lg p-2 rounded-full text-lg"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
