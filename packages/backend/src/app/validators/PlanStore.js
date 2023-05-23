import * as Yup from 'yup'

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .integer()
        .positive()
        .required(),
      price: Yup.number()
        .positive()
        .required(),
    })

    await schema.validate(req.body, { abortEarly: false })

    return next()
  } catch (error) {
    return res.status(400).json({
      error: 'Validation fails',
      messages: error.inner,
    })
  }
}
