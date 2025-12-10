import yup from 'yup'

export const productoSchema = yup.object({
    nombre: yup.string().required().min(6, 'El nombre debe contener como mínimo 6 caracteres').max(50, 'El nombre debe contener como máximo 50 caracteres'),
    descripcion: yup.string().required().min(30).max(200),
    tecnologias: yup.string().required(),
    url: yup.string()
        .notRequired()
        .matches(/^[0-9a-fA-F]{24}$/, 'no es un id de mongo')
});