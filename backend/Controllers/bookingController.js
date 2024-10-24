import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import Booking from '../models/BookingSchema.js'
import Stripe from 'stripe'
import messages from '../utils/const.js';
import sendReminder from '../utils/emailService.js'; // Import the email service

/**
 * Retrieves the checkout session for booking a doctor appointment.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the checkout session is retrieved.
 * @throws {Error} - If there is an error retrieving the checkout session.
 */
export const getCheckoutSession = async(req,res)=>{
    try{

        // get currently booked doctor
        const doctor = await Doctor.findById(req.params.doctorId)
        const user = await User.findById(req.userId)

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

        // create stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            success_url:`${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url:`${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
            customer_email:user.email,
            client_reference_id:req.params.doctorId,
            line_items:[{
                price_data:{
                    currency:'inr',
                    unit_amount:doctor.ticketPrice * 100,
                    product_data:{
                        name:doctor.name,
                        description:doctor.bio,
                        images:[doctor.photo]
                    }
                },
                quantity:1
            }]
        })

        // create new booking
        const booking = new Booking({
            doctor: doctor._id,
            user:user._id,
            ticketPrice:doctor.ticketPrice,
            session:session.id
        })

        await booking.save()

        res.status(200).json({success:true, message:messages.booking.paymentSuccess, session})
    } catch(err){
        res
        .status(500)
        .json({ success:false, messasge: messages.booking.paymentError });

    }
}

// After booking is saved, send a reminder immediately
const booking = new Booking({
    doctor: doctor._id,
    user: user._id,
    ticketPrice: doctor.ticketPrice,
    session: session.id,
  });
  
  await booking.save();
  
  // Send reminder email
  const appointmentDetails = {
    patientName: user.name,
    patientEmail: user.email,
    doctorName: doctor.name,
    date: new Date(booking.date).toLocaleDateString(),
    time: new Date(booking.date).toLocaleTimeString(),
    location: booking.location || 'Online/Clinic',
  };
  
  sendReminder(appointmentDetails);