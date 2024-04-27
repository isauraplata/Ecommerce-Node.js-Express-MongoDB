import Joi from "joi";
// import passwordComplexity from "joi-password-complexity";

export const signUpBodyValidation=(body)=>{
    //validando el req.body
    const schema=Joi.object({
        username:Joi.string().required().label("Name"),
        email:Joi.string().email().required().label("Email"),
        password:Joi.string().required().label("Password"),
    })
    return schema.validate(body)
}

export const loginBodyValidation=(body)=>{
    const schema=Joi.object({
        email:Joi.string().email().required().label("Email"),
        password:Joi.string().required().label("Password")
    })
    return schema.validate(body)

}

export const refreshTokenValidation=(body)=>{
    const schema=Joi.object({
        refreshToken:Joi.string().required().label("refresh Token"),
       
    })
    return schema.validate(body)
}