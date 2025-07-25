import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvtarEdit from "../components/UserProfileAvtarEdit";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import fetchUserDetails from "../utils/fetchUserDetails";
import { setUserDetails } from "../store/userSlice";

const Profile = () => {
  const [openProfileAvtarEdit, setOpenProfileAvtarEdit] = useState(false);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch =useDispatch()
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });
  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, []);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });
      const {data : responseData} =response
      if(responseData.success){
        toast.success(responseData.message)
        const userData = await fetchUserDetails()
            dispatch(setUserDetails(userData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      {/**profile upload and display image */}
      <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {user.avtar ? (
          <img alt={user.name} src={user.avtar} className="w-full h-full" />
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>
      <button
        className="text-sm min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-3 py-1 rounded-full mt-3"
        onClick={() => setOpenProfileAvtarEdit(true)}
      >
        Edit
      </button>
      {openProfileAvtarEdit && (
        <UserProfileAvtarEdit close={() => setOpenProfileAvtarEdit(false)} />
      )}
      {/**name email mobile change password  */}
      <form className="my-4 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            name="name"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200"
            value={userData.name}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your name"
            name="email"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200"
            value={userData.email}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter your name"
            name="mobile"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200"
            value={userData.mobile}
            onChange={handleOnChange}
            required
          />
        </div>
        <button className="border px-4 py-2 font-semibold hover:bg-primary-100 text-primary-200 hover:text-neutral-800 rounded">
          {loading ? "loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
