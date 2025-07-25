import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { updateAvtar } from "../store/userSlice";
import {IoClose} from 'react-icons/io5'

const UserProfileAvtarEdit = ({close}) => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch= useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleUploadAvtarImage=async(e)=>{
    const file= e.target.files[0]
    if(!file){
      return
    }
    const formData =new FormData()
    formData.append("avtar",file)

    try {
      setLoading(true)
      const response= await Axios({
        ...SummaryApi.uploadAvtar,
        data: formData
      })
      const {data: responseData} =response;
      dispatch(updateAvtar(responseData.data.avtar))
      
    } catch (error) {
      AxiosToastError(error)
    }
    finally{
      setLoading(false)
    }
  } 
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/60 p-4 flex items-center justify-center">

      <div className="bg-white max0w-sm w-full rounded p-4 flex flex-col items-center justify-center">
        <button className="text-neutral-800 w-fit block ml-auto" onClick={close}>
          <IoClose size={20}/>
        </button>
        <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
          {user.avtar ? (
            <img alt={user.name} src={user.avtar} className="w-full h-full" />
          ) : (
            <FaRegUserCircle size={65} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadprofile">
            <div className="border border-primary-200 hover:bg-primary-200 px-4 py-1 rounded text-sm my-3 cursor-pointer">
              {loading ? "loading..." : "Upload"}
            </div>
          </label>
          <input type="file" id="uploadprofile" className="hidden" onChange={handleUploadAvtarImage}/>
        </form>

      </div>
    </section>
  );
};

export default UserProfileAvtarEdit;
