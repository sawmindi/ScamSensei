import { body, validationResult } from "express-validator";


export const validate =(validations)=>{
    return async (req,res,next)=>{
    for (let validation of validations) {
        const result = await validation.run(req)
        if (!result.isEmpty()) {
            break;
        }
        
    }
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    return res.status(422).json({errors:errors.array()})
    }
    
}
export const loginValidator = [
    body("email").trim().isEmail().withMessage("email is not valid"),
    body("password").notEmpty().withMessage("password cannot be empty"),
]
export const signupValidator = [
    body("name").notEmpty().withMessage("username cannot be empty"),
    body("email").trim().isEmail().withMessage("email is not valid"),
    body("password").notEmpty().withMessage("password cannot be empty"),
]

export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("message cannot be empty"),
]