const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message(`URL-адресс поля ${helpers.state.path} должен быть валидным`);
};

const createUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .label('Email')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'any.required': 'Поле {#label} обязательно для заполнения',
        'string.email': '{#label} должен быть валидным',
        'string.empty': 'Поле {#label} не может быть пустым',
      }),
    password: Joi
      .string()
      .required()
      .min(8)
      .label('Пароль')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'any.required': 'Поле {#label} обязательно для заполнения',
        'string.min': '{#label} должен содержать не менее {#limit} символов',
        'string.empty': 'Поле {#label} не может быть пустым',
      }),
    name: Joi
      .string()
      .min(2)
      .max(30)
      .label('Имя')
      .messages({
        'string.base': '{#label} должно быть строкой',
        'any.required': 'Поле {#label} обязательно для заполнения',
        'string.min': '{#label} должно содержать не менее {#limit} символов',
        'string.max': '{#label} должно содержать не более {#limit} символов',
        'string.empty': 'Поле {#label} не может быть пустым',
      }),
  }),
});

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .label('Email')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'any.required': 'Поле {#label} обязательно для заполнения',
        'string.email': '{#label} должен быть валидным',
        'string.empty': 'Поле {#label} не может быть пустым',
      }),
    password: Joi
      .string()
      .required()
      .min(8)
      .label('Пароль')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'any.required': 'Поле {#label} обязательно для заполнения',
        'string.min': '{#label} должен содержать не менее {#limit} символов',
        'string.empty': 'Поле "{#label}" не может быть пустым',
      }),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email()
      .label('Email')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'any.required': 'Поле {#label} обязательно для заполнения',
        'string.email': '{#label} должен быть валидным',
        'string.empty': 'Поле {#label} не может быть пустым',
      }),
    name: Joi
      .string()
      .min(2)
      .max(30)
      .label('Имя')
      .messages({
        'string.base': '{#label} должно быть строкой',
        'any.required': 'Поле {#label} обязательно для заполнения',
        'string.min': '{#label} должно содержать не менее {#limit} символов',
        'string.max': '{#label} должно содержать не более {#limit} символов',
        'string.empty': 'Поле {#label} не может быть пустым',
      }),
  }),
});

const addMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi
      .string()
      .required()
      .label('Страна')
      .messages({
        'string.base': '{#label} должна быть строкой',
        'any.required': 'Поле {#label} обязательно для заполнения',
        'string.empty': 'Поле {#label} не может быть пустым',
      }),
    director: Joi
      .string()
      .required()
      .label('Режисер')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'any.required': 'Поле {#label} обязательно для заполнения',
        'string.empty': 'Поле {#label} не может быть пустым',
      }),
    duration: Joi
      .number()
      .required()
      .label('Продолжительность')
      .messages({
        'number.base': '{#label} должна быть числом',
        'number.integer': '{#label} должна быть целым числом',
        'any.required': 'Поле {#label} обязательно для заполнения',
      }),
    year: Joi
      .string()
      .required()
      .label('Год')
      .length(4)
      .messages({
        'string.base': '{#label} должен быть строкой',
        'any.required': 'Поле {#label} обязательно для заполнения',
        'string.length': 'Поле {#label} должно содержать {#limit} символа',
      }),
    description: Joi
      .string()
      .required()
      .label('Описание')
      .messages({
        'string.base': '{#label} должно быть строкой',
        'any.required': 'Поле {#label} обязательно для заполнения',
        'string.empty': 'Поле {#label} не может быть пустым',
      }),
    image: Joi
      .string()
      .required()
      .label('URL-адресс постера')
      .custom(validateURL)
      .messages({
        'string.base': '{#label} должен быть строкой',
        'any.required': 'Поле {#label} обязательно для заполнения',
        'string.empty': 'Поле {#label} не может быть пустым',
      }),
    trailer: Joi
      .string()
      .custom(validateURL)
      .required()
      .label('URL-адресс трейлера')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'any.required': 'Поле {#label} обязательно для заполнения',
        'string.empty': 'Поле {#label} не может быть пустым',
      }),
    thumbnail: Joi
      .string()
      .custom(validateURL)
      .required()
      .label('URL-адресс превью постера')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'any.required': 'Поле {#label} обязательно для заполнения',
        'string.empty': 'Поле {#label} не может быть пустым',
      }),
    movieId: Joi
      .number()
      .required()
      .label('id фильма')
      .messages({
        'number.base': '{#label} должен быть числом',
        'any.required': 'Поле {#label} обязательно для заполнения',
      }),
    nameRU: Joi
      .string()
      .required()
      .label('Название фильма на русском языке')
      .messages({
        'string.base': '{#label} должно быть строкой',
        'any.required': 'Поле {#label} обязательно для заполнения',
        'string.empty': 'Поле {#label} не может быть пустым',
      }),
    nameEN: Joi
      .string()
      .required()
      .label('Название фильма на английском языке')
      .messages({
        'string.base': '{#label} должно быть строкой',
        'any.required': 'Поле {#label} обязательно для заполнения',
        'string.empty': 'Поле {#label} не может быть пустым',
      }),
  }),
});

const removeMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi
      .string()
      .hex()
      .length(24)
      .label('movieId')
      .messages({
        'string.base': '{#label} должен быть строкой',
        'string.hex': '{#label} должен содержать только шестнадцатеричные символы',
        'string.length': '{#label} должен содержать {#limit} символа',
      }),
  }),
});

module.exports = {
  createUserValidator,
  loginValidator,
  updateUserValidator,
  addMovieValidator,
  removeMovieValidator,
};
