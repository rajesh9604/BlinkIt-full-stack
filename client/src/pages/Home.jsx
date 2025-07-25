import React from "react";
import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import { useSelector } from "react-redux";
import { ValidUrlConvert } from "../utils/ValidUrlConvert";
import { Link, useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  
  const handleRedirectProductList = (id, cat) => {
    const subcategory = subCategoryData?.find((sub) => {
      
      
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });
      return filterData ? true : null;
    });
    

    const url = `/${ValidUrlConvert(cat)}-${id}/${ValidUrlConvert(
      subcategory?.name
    )}-${subcategory._id}`;

    navigate(url);
  };

  return (
    <section className="bg-white w-full h-full">
      <div className="  container mx-auto">
        <div
          className={`w-full h-full min-h-48 bg-blue-100  rounded ${
            !banner && "animate-pulse my-2"
          } `}
        >
          <img
            src={banner}
            className="w-full h-full hidden lg:block md:block"
            alt="banner"
          />
          <img
            src={bannerMobile}
            className="w-full h-full block lg:hidden md:hidden"
            alt="bannerMobile"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 my-2 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {loadingCategory
          ? new Array(12).fill(null).map((c, index) => {
              return (
                <div
                  key={index + "loadingcategory"}
                  className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
                >
                  <div className="bg-blue-100 min-h-20 rounded"></div>
                  <div className="bg-blue-100 h-8 rounded"></div>
                </div>
              );
            })
          : categoryData.map((cat, index) => {
              return (
                <div
                  key={cat._id + "displayCategory" || index}
                  className="w-full h-full "
                  onClick={() => handleRedirectProductList(cat._id, cat.name)}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-50 object-scale-down cursor-pointer"
                  />
                </div>
              );
            })}
      </div>
      {/** display category product */}
      {categoryData.map((c, index) => {
        return (
          <CategoryWiseProductDisplay
            id={c?._id}
            name={c?.name}
            key={c?._id + index + "CategoryProduct"}
          />
        );
      })}
    </section>
  );
};

export default Home;
