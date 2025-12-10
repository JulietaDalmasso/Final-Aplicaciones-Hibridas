import yup from 'yup'

export const proyectoSchema = yup.object({
    title: yup.string().required('El título es obligatorio').min(3, 'El título debe tener al menos 3 caracteres'),
    description: yup.string().max(1000, 'La descripción es demasiado larga').nullable(),
})
