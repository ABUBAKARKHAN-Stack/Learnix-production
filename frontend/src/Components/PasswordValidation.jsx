import React, { useEffect } from 'react'

function PasswordValidation({ password, onPasswordValidity }) {

    const passwordValidationRegix = {
        eightDigits: /^.{8,}$/,
        oneUppercase: /^(?=.*[A-Z]).{1,}$/,
        oneLowercase: /^(?=.*[a-z]).{1,}$/,
        oneNumber: /^(?=.*\d).{1,}$/,
        oneSpecialChar: /^(?=.*[!@#$%^&*]).{1,}$/
    }
    const validatePassword = {
        validateMinLength: () => passwordValidationRegix.eightDigits.test(password),
        validateUppercase: () => passwordValidationRegix.oneUppercase.test(password),
        validateLowercase: () => passwordValidationRegix.oneLowercase.test(password),
        validateNumber: () => passwordValidationRegix.oneNumber.test(password),
        validateSpecialChar: () => passwordValidationRegix.oneSpecialChar.test(password),
    }
  
    const isPasswordValid = Object.values(validatePassword).every(validate => validate())


    useEffect(() => {
        onPasswordValidity(isPasswordValid)
    }, [isPasswordValid, onPasswordValidity])


    const validatePasswordElements = [
        {
            message: 'Use 8 or more characters',
            method: validatePassword.validateMinLength()
        },
        {
            message: 'One Uppercase character',
            method: validatePassword.validateUppercase()
        },
        {
            message: 'One lowerase character',
            method: validatePassword.validateLowercase()
        },
        {
            message: 'One number',
            method: validatePassword.validateNumber()
        },
        {
            message: 'One special character',
            method: validatePassword.validateSpecialChar()
        },
    ]

    return (
        <>
            {
                validatePasswordElements.map((elem, i) => {
                    const { message, method } = elem
                    return (
                        <ul key={i} className={`text-[9px] lg:text-[10px] font-medium flex transition-colors duration-300 ease-linear items-center   border ${method ? 'border-green-600 text-green-600' : 'border-gray-500 text-gray-800'} px-2 py-1 rounded-full w-fit`}>
                            <li>{message}</li>
                        </ul>

                    )
                })
            }
        </>
    )
}

export default PasswordValidation