import User from "../models/UserSchema.js";
import BookingSchema from "../models/BookingSchema.js";
import messages from "../utils/const.js";

export const updateUser = async(req, res) => {
    const id = req.params.id

    try {
         const updatedUser = await User.findByIdAndUpdate(id, {$set: req.body}, {new:true})

         res.status(200).json({success: true, message: messages.user.updateSuccess, data:updatedUser})
    }
    catch(err){
        res.status(500).json({success:false, message: messages.user.updateFail});
    }
};

export const deleteUser = async(req, res) => {
    const id = req.params.id

    try {
         await User.findByIdAndDelete(id)

         res.status(200).json({success: true, message: messages.user.deleteSuccess})
    }
    catch(err){
        res.status(500).json({success:false, message: messages.user.deleteFail});
    }
};

export const getSingleUser = async(req, res) => {
    const id = req.params.id

    try {
         const user = await User.findById(id).select("-password");

         res.status(200).json({success: true, message: messages.user.getSuccess, data:user})
    }
    catch(err){
        res.status(404).json({success:false, message: messages.user.getFail});
    }
};

export const getAllUser = async(req, res) => {

    try {
         const users = await User.find({}).select("-password");

         res.status(200).json({success: true, message: messages.user.getAllSuccess, data: users})
    }
    catch(err){
        res.status(404).json({success:false, message: messages.user.getAllFail});
    }
};

export const getUserProfile = async(req, res) => {
    const userId = req.userId

    try{
        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({success:false, message: messages.user.profileFail});
        }

        const {password, ...rest} = user._doc;

        res.status(200).json({success: true, message: messages.user.profileSuccess, data:{...rest}});
    } 
    catch(err) {
        res.status(500).json({success:false, message: messages.user.profileFail});
    }
};

/**
 * Retrieves the appointments of the current user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the appointments are retrieved.
 * @throws {Error} - If there is an error retrieving the appointments.
 */
/**
 * Retrieves the appointments of the current user.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the appointments are retrieved.
 * @throws {Error} - If there is an error retrieving the appointments.
 */
export const getMyAppointments = async(req, res) => {
    try{
        // step-1: retrieve appointments from booking for specific user
        const bookings = await Booking.find({user:req.userId})

        // step-2: extract doctor ids from appointment bookings
        const doctorIds = bookings.map(el => el.doctor.id)

        // step-3: retrieve doctors using doctor ids
        const doctors = await Doctor.find({_id: {$in:doctorIds}}).select('-password') 

        res.status(200).json({success:true, message: messages.user.appointmentSuccess, data:doctors})
    }
    catch(err){
        res.status(500).json({success:false, message: messages.user.appointmentFail});
    }
}