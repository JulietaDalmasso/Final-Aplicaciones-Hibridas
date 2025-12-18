import yup from 'yup'

export const proyectoSchema = yup.object({
  title: yup
    .string()
    .required('El título es obligatorio')
    .min(3, 'El título debe tener al menos 3 caracteres'),

  description: yup
    .string()
    .max(1000, 'La descripción es demasiado larga')
    .nullable(),

  tecnologias: yup.mixed().optional(),

  img: yup
    .string()
    .url('La imagen debe ser una URL válida')
    .nullable()
    .optional(),

  clienteNombre: yup
    .string()
    .required('El nombre del cliente es obligatorio')
    .min(2, 'El nombre del cliente es muy corto'),

  clienteEmail: yup
    .string()
    .email('El email del cliente no es válido')
    .required('El email del cliente es obligatorio'),

  clienteFoto: yup
    .string()
    .url('La foto debe ser una URL válida')
    .required('La foto del cliente es obligatoria'),

  clienteDescripcion: yup
    .string()
    .min(5, 'La descripción del cliente es muy corta')
    .required('La descripción del cliente es obligatoria')
})
