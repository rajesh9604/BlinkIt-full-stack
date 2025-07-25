import React, { useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import { useEffect } from "react";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useSelector } from "react-redux";

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openConfirmBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });
  // const allCategory =useSelector((state)=>state.product.allCategory)
  
  // useEffect(()=>{
  //   setCategoryData(allCategory)
  // },[allCategory])
  
  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory =async () => {
    try {
      const response =await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory
      })
      const {data: responseData}= response
      if(responseData.success){
        toast.success(responseData.message)
        fetchCategory()
        setOpenConfirmBoxDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  };

  return (
    <section>
      <div className="p-2  bg-white shadow-md flex items-center justify-between">
        <h2 className="font-semibold">CategoryPage</h2>
        <button
          className="text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded"
          onClick={() => setOpenUploadCategory(true)}
        >
          Add Category
        </button>
      </div>
      {!categoryData[0] && !loading && <NoData />}
      {loading && <Loading />}
      <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {categoryData.map((category) => {
          return (
            <div className="w-32 h-56  rounded shadow-md " key={category._id}>
              <img
                alt={category.name}
                src={category.image}
                className="w-full object-scale-down"
              />
              <div className="items-center h-9 flex">
                <button
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded"
                  onClick={() => {
                    setOpenEdit(true), setEditData(category);
                  }}
                >
                  Edit
                </button>
                <button
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded"
                  onClick={() => {setOpenConfirmBoxDelete(true), setDeleteCategory(category)}}
                >
                  
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}
      {openEdit && (
        <EditCategory
          close={() => setOpenEdit(false)}
          fetchData={fetchCategory}
          data={editData}
        />
      )}
      {openConfirmBoxDelete && (
        <ConfirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
          cancel={() => setOpenConfirmBoxDelete(false)}
        />
      )}
    </section>
  );
};

export default CategoryPage;
