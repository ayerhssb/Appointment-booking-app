import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import messages from "../utils/const.js";

export const updateDoctor = async(req, res) => {
    const id = req.params.id

    try {
         const updatedDoctor = await Doctor.findByIdAndUpdate(id, {$set: req.body}, {new:true})

         res.status(200).json({success: true, message: messages.doctor.updateSuccess, data:updatedDoctor})
    }
    catch(err){
        res.status(500).json({success:false, message: messages.doctor.updateFail});
    }
};

export const deleteDoctor = async(req, res) => {
    const id = req.params.id

    try {
         await Doctor.findByIdAndDelete(id )

         res.status(200).json({success: true, message: messages.doctor.deleteSuccess})
    }
    catch(err){
        res.status(500).json({success:false, message: messages.doctor.deleteFail});
    }
};

export const getSingleDoctor = async(req, res) => {
    const id = req.params.id

    try {
         const doctor = await Doctor.findById(id).populate("reviews").select("-password");

         res.status(200).json({success: true, message: messages.doctor.found, data:doctor})
    }
    catch(err){
        res.status(404).json({success:false, message: messages.doctor.notFound});
    }
};

export const getAllDoctor = async(req, res) => {

    try {
        const { query } = req.query;
        let doctors;

        if(query){
            doctors = await Doctor.find({
                isApproved: "approved", 
                $or: [
                    {name: {$regrex: query, $option:"i"}},
                    {specialization:{$regrex: query, $options: "i"}},
                ],
            }).select("-password");
        }
        else{
            doctors = await Doctor.find({ isApproved: "approved"}).select("-password");
        }

         res.status(200).json({success: true, message: messages.doctor.doctorsFound, data:doctors})
    }
    catch(err){
        res.status(404).json({success:false, message: messages.doctor.notFound});
    }
};

export const getDoctorProfile = async(req,res)=>{
    const doctorId = req.userId

    try{
        const doctor = await Doctor.findById(doctorId)

        if(!doctor){
            return res.status(404).json({success:false, message: messages.doctor.notFound});
        }

        const {password, ...rest} = doctor._doc;
        const appointments = await Booking.find({doctor:doctorId});

        res.status(200).json({success: true, message: messages.doctor.profileSuccess, data:{...rest, appointments}});
    } 
    catch(err) {
        res.status(500).json({success:false, message: messages.doctor.profileFail});
    }
}