import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "../components/Loading";
import ProductCartAdmin from "../components/ProductCartAdmin";
import { IoSearchOutline } from "react-icons/io5";


const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");
  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: search,
        },
      });
      const { data: responseData } = response;
      console.log("product page", responseData);

      if (responseData.success) {
        setProductData(responseData.data);
        setTotalPageCount(responseData.totalNoPage || 1);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductData();
  }, [page]);
  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage((preve) => preve + 1);
    }
  };
  const handlePrevious = () => {
    if (page > 1) {
      setPage((preve) => preve - 1);
    }
  };
  const handleOnChange = (e) => {
    const { value } = e.target;
    setPage(1)
    setSearch(value);
  };
  useEffect(()=>{
    let flag =true
    const interval = setTimeout(()=>{
      if(flag){

        fetchProductData()
        flag=false
      }
    },300)
    return ()=>{
      clearInterval(interval)
    }
  },[search])
  return (
    <section>
      <div className="p-2  bg-white shadow-md flex items-center justify-between gap-4">
        <h2 className="font-semibold"> Product</h2>
        <div className="h-full min-w-24 w-full max-w-56 ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 border focus-within:border-primary-200 rounded ">
          <IoSearchOutline size={25} />
          <input
            type="text"
            placeholder="Search product here..."
            className="h-full w-full outline-none bg-transparent"
            value={search}
            onChange={handleOnChange}
          />
        </div>
      </div>
      {loading && <Loading />}
      <div className="p-4 bg-blue-50">
        <div className="min-h-[55vh]">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {productData.map((p, index) => {
              return <ProductCartAdmin data={p} key={p._id +index+"productsection"} fetchProductData={fetchProductData} />;
            })}
          </div>
        </div>

        <div className="flex justify-between my-4">
          <button
            onClick={handlePrevious}
            className="border border-primary-200 px-4 py-1 hover:bg-primary-200"
          >
            Previous
          </button>
          <button className="w-full bg-slate-100">
            {page}/{totalPageCount}
          </button>
          <button
            onClick={handleNext}
            className="border border-primary-200 px-4 py-1 hover:bg-primary-200"
          >
            Next
          </button>
        </div>
      </div>
      
    </section>
  );
};

export default ProductAdmin;
