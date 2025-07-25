import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { useEffect } from "react";
import Loading from "../components/Loading";
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import { ValidUrlConvert } from "../utils/ValidUrlConvert";
const ProductListPage = () => {
  const params = useParams();


  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const AllsubCategory = useSelector((state) => state.product.allSubCategory);
  const [displaySubCategory, setDisplaySubCategory] = useState([]);

  const subCategory = params?.subCategory.split("-");
  const subCategoryName = subCategory
    ?.slice(0, subCategory?.length - 1)
    .join(" ");

  const categoryId = params.category.split("-").slice(-1)[0];

  const subCategoryId = params.subCategory.split("-").slice(-1)[0];

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 10,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        if (responseData.page === 1) {
          setData(responseData.data);
        } else {
          setData([...data, ...responseData.data]);
        }
        setTotalPage(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductData();
  }, [params]);
  useEffect(() => {
    const sub = AllsubCategory.filter((s) => {
      const filterData = s.category.some((el) => {
        return el._id == categoryId;
      });
      return filterData ? filterData : null;
    });
    setDisplaySubCategory(sub);
  }, [params, AllsubCategory]);
  return (
    <section className="sticky top-24 lg:top-20 ">
      <div className="container sticky top-24  mx-auto grid grid-cols-[90px_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[280px_1fr]">
        {/**sub Categroy */}
        <div className=" h-full min-h-[88vh] max-h-[88vh] overflow-y-scroll   grid gap-1 shadow-md scrollbarCustom bg-white py-2">
          {displaySubCategory.map((s, index) => {
            const link = `/${ValidUrlConvert(s?.category[0]?.name)}-${
              s?.category[0]?._id
            }/${ValidUrlConvert(s.name)}-${s._id}`;
            return (
              <Link
                to={link}
                key={s._id + index + "subcategoryMenu"}
                className={`w-full p-2 bg-white lg:flex  lg:h-16  box-border lg: gap-4 broder-b ${
                  subCategoryId === s._id ? "bg-green-100" : ""
                } hover:bg-green-300 cursor-pointer`}
              >
                <div className="w-fit mx-auto lg:mx-0 max-w-28 bg-white rounded  box-border">
                  <img
                    src={s.image}
                    alt="subCategroy"
                    className="w-14 lg:h-14 lg:w-12 h-full object-scale-down "
                  />
                </div>
                <p className=" -mt-6 lg: mt-0 text-xs text-center lg: text-lg lg: text-left">
                  {s.name}
                </p>
              </Link>
            );
          })}
        </div>
        {/**Product */}
        <div className="sticky t-20">
          <div className="bg-white shadow-md p-2 z-10">
            <h3>{subCategoryName}</h3>
          </div>
          <div>
            <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 ">
                {data.map((p, index) => {
                  return (
                    <CardProduct
                      key={p._id + index + "CategoryWiseProductDisplay"}
                      data={p}
                    />
                  );
                })}
              </div>
            </div>
            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;
