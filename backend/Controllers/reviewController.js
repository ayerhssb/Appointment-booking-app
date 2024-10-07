import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";
import messages from "../utils/const.js";

// get all reviews
export const getAllReviews = async (req, res) => {
    try{
        const reviews = await Review.find({});

        res.status(200).json({success:true, message: messages.review.success , data: reviews});
    }catch(err){
        res.status(404).json({success:false, message: messages.review.notFound })
    }
};

// create review
/**
 * Creates a new review and saves it to the database.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the review is created and saved.
 * @throws {Error} - If there is an error while creating or saving the review.
 */
export const createReview = async(req,res) =>{
    if(!req.body.doctor) req.body.doctor = req.params.doctorId
    if(!req.body.user) req.body.user = req.userId;

    const newReview = new Review(req.body);

    try{
        const savedReview = await newReview.save();

        await Doctor.findByIdAndUpdate(req.body.doctor,{
            $push: {reviews: savedReview._id },
        });

        res.status(200).json({success:true, message: messages.review.submitted, data: savedReview});
    }catch(err){
        res.status(500).json({success:false, message: messages.error.serverError });
    }
};