import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";


const uploadImageController =async(request,response)=>{
    try {
        const file =request.file
        console.log(file);
        const uploadImage =await uploadImageCloudinary(file)
        return response.json({
            message: "upload done",
            data: uploadImage,
            error:false,
            success:true
        })
        
    } catch (error) {
        return response.status(500).json({
            message:error.message ||error,
            error:true,
            success:false

        })
    }
}
export default uploadImageController