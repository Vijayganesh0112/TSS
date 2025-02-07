const express = require('express');
const router = express.Router();
require('dotenv').config();
const { User , Otp} = require('../components/db');

const zod = require('zod');
const otpGenerator=require('otp-generator');
const twilio = require('twilio');
const { otpValidator } = require('../helper/otpValidator');
const { userId } = require('../helper/userIdCreator');

const accountSid=process.env.TWILIO_ACCOUNT_SID;
const accountAuth=process.env.TWILIO_AUTH_TOKEN;

const twilioClient = new twilio(accountSid , accountAuth);
const cors = require('cors');

router.use(express.json());
router.use(cors());
const otpBody = zod.object({
    userPhone:zod.string(),
});
const userSignupbody = zod.object({
    userName:zod.string(),
    userPhone:zod.string(),
    userEmail:zod.string(),
    otp:zod.string(),
    password:zod.string()
});

router.post('/send-otp', async(req,res)=>{
    const {success} = otpBody.safeParse(req.body);

    if(!success){
        res.status(411).json({
            message:"Your input data is invalid.."
        })
        return;
    }
    try{
        const {userPhone} = req.body;
        let otp = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
            digits: true
          });

        const message = twilioClient.messages.create({
            body:`Your Sign In Otp is ${otp} valid for 10 minutes`,
            to:userPhone,
            from:+17754178654
        })

        const cDate = new Date();
        const otpUser = await Otp.findOneAndUpdate(
            {userPhone},
            {otp , otpExpiration:new Date(cDate.getTime())},
            {upsert:true,new:true,setDefaultsOnInsert:true}
        )

        return res.status(200).json({
            success:true,
            message:otp,
        });

    }catch(error){
        return res.status(400).json({
            success:false,
            message:error.message,
        });
    }
});

router.post('/signup',async (req,res) => {
    // const {success} = userSignupbody.safeParse(req.body);

    // if(!success){
    //     return res.status(411).json({
    //         message:"Your input data is invalid.."
    //     })
    // }

    const {userName,userPhone,userEmail,otp} = req.body;
    const uid = userId(userName,userPhone);

   

    try {
        const Eotp = await Otp.findOne({userPhone});

        if(!Eotp){
            return res.status(400).json({
                success:false,
                message:"You have entered a wrong otp"
            })
        }

        const isOtpValid = await otpValidator(Eotp.otpExpiration);

       


        if(isOtpValid){
            const user = await User.findOne({userId:uid});
            if(user){
                return res.status(400).json({
                    message:"User Already exists"
                })
            }
            if(Eotp.otp == otp){
                await User.create({
                    userId:uid,
                    userName,
                    userPhone,
                    userEmail,
                });

               return res.status(200).json({
                    success:true,
                    message:"Successfully signed up"
                });
            }
        }else{
            return res.status(404).json({
                success:false,
                message:"You have entered a wrong otp or otp is expired"
            })
        }
       
    }catch(err){
        return res.status(404).json({
            success:false,
            message:err.message
        })
    }
    
});
const signinBody = zod.object({
    userPhone:zod.string(),
    otp:zod.string()
})

router.post('/signin', async (req,res) =>{
    const {success} = signinBody.safeParse(req.body);
    if(!success){
        return res.status(400).json({
            message:"Entered invalid input data"
        })
    }
    try{
       const {userPhone , otp} = req.body;
        const user= User.findOne({userPhone});
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
        else{
            try{
                const Eotp = await Otp.findOne({userPhone});
                if(!Eotp){
                    return res.status(400).json({
                        success:false,
                        message:"You have entered a wrong otp"
                    })
                 }

                const isOtpValid = await otpValidator(Eotp.otpExpiration);
                if(isOtpValid){
                    if(otp == Eotp.otp){
                         return res.status(200).json({
                            message:"Login Successfull"
                         })
                    }
                
                    else{
                        return res.status(404).json({
                            message:"user not found"
                        })
                    }

            
                }else{
                    return res.status(400).json({
                        success:false,
                        message:"You have entered a wrong otp"
                    })

                }
            } catch(e){
                return res.json(e.message);
            }
           
        }
    }catch(e){
        return res.status(404).json({
            message:"Invalid User!"
        })
    }

})
module.exports = router;