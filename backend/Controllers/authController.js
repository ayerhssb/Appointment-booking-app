import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
// import * as crypto from 'crypto';

import messages from '../utils/const.js'

const generateToken = user=>{
    return jwt.sign(
        {id:user._id, role: user.role},
        process.env.JWT_SECRET_KEY,{
            expiresIn: "15d",
        }
    );
};

export const register = async (req, res) => {
    const {email, password, name, role, photo, gender} = req.body
    try{
        let user = null
        if(role== 'patient'){
            user = await User.findOne({email})
        }
        else if(role == 'doctor'){
            user = await Doctor.findOne({email})
        }

        // check if user exist
        if(user){
            return res.status(400).json({message: messages.user.alreadyExists });
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        if(role == 'patient'){
            user = new User({
                name,
                email,
                password:hashPassword,
                photo,
                gender,
                role
            })
        }

        if(role == 'doctor'){
            user = new Doctor({
                name,
                email,
                password:hashPassword,
                photo,
                gender,
                role
            })
        }

        await user.save()
        res.status(200).json({success:true, message: messages.user.createdSuccessfully });

    }catch(err){
        res.status(500).json({ success: false, message: messages.error.serverError });
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body

    try{
        let user = null
        const patient = await User.findOne({email})
        const doctor = await Doctor.findOne({email})

        if(patient){
            user= patient
        }
        if(doctor){
            user=doctor
        }

        // check if user exist or not
        if(!user){
            return res.status(404).json({message: messages.user.notFound});
        }

        // compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch){
            return res.status(400).json({status:false, message: messages.user.invalidCredentials});
        }

        // get token
        const token = generateToken(user);

        const { password, role, appointments, ...rest} = user._doc;

        res.status(200).json({status:true, message: messages.user.loginSuccess, token, data: {...rest}, role});
    }catch(err){
        res.status(500).json({status:false, message: messages.error.loginFailed });
    }
};