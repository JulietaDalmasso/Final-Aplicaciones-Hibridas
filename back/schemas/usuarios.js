import yup from 'yup'

export const usuarioSchema = yup.object({
    username: yup.string().required('El nombre de usuario es obligatorio').min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
    email: yup.string()
        .email('El correo electrónico no tiene un formato válido')
        .required('El correo electrónico es obligatorio'),
    password: yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(16, 'La contraseña no puede tener más de 16 caracteres')
        .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
        .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
        .matches(/[@!*$#&?]/, 'La contraseña debe contener al menos un caracter especial (@!*$#&?)')
        .required('La contraseña es obligatoria'),
    passwordConfirm: yup.string()
        .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
        .required('Debes confirmar la contraseña'),
    age: yup.number()
        .typeError('La edad debe ser un número')
        .integer('La edad debe ser un número entero')
        .min(1, 'La edad mínima es 1')
        .required('La edad es obligatoria')
})

export const loginSchema = yup.object({
    email: yup.string()
        .email('El correo electrónico no tiene un formato válido')
        .required('El correo electrónico es obligatorio'),
    password: yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(16, 'La contraseña no puede tener más de 16 caracteres')
        .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
        .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
        .matches(/[@!*$#&?]/, 'La contraseña debe contener al menos un caracter especial (@!*$#&?)')
        .required('La contraseña es obligatoria')
})