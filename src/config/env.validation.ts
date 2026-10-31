import Joi from 'joi';

/**
 * Joi = env variables validate karta hai - type, format, required check.
 * Galat value ya missing required var = app start nahi hoga, clear error milega.
 */
export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),
  PORT: Joi.number().default(5000),

  DB_HOST: Joi.string().default('127.0.0.1'),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().default('shilpajha'),
  DB_PASSWORD: Joi.string().allow('').default('shilpajha'),
  DB_NAME: Joi.string().default('lms_development'),
  // DB_SSL - 'true' string ko boolean me convert. Cloud DB par SSL enable karta hai.
  DB_SSL: Joi.boolean().truthy('true').falsy('false').default(false),

  // JWT_SECRET - required, min 10 chars. Token sign/verify ke liye - weak secret = security risk.
  JWT_SECRET: Joi.string().min(10).required(),
  JWT_EXPIRES_IN: Joi.string().default('7d'),
  FRONTEND_URL: Joi.string().uri().default('http://localhost:3000'),

  GOOGLE_CLIENT_ID: Joi.string().allow('').default(''),
  GOOGLE_CLIENT_SECRET: Joi.string().allow('').default(''),
  GOOGLE_CALLBACK_URL: Joi.string()
    .uri()
    .default('http://localhost:5000/api/auth/google/callback'),

  CLOUDINARY_CLOUD_NAME: Joi.string().allow('').default(''),
  CLOUDINARY_API_KEY: Joi.string().allow('').default(''),
  CLOUDINARY_API_SECRET: Joi.string().allow('').default(''),

  RAZORPAY_KEY_ID: Joi.string().allow('').default(''),
  RAZORPAY_KEY_SECRET: Joi.string().allow('').default(''),
  RAZORPAY_WEBHOOK_SECRET: Joi.string().allow('').default(''),
  RAZORPAYX_SOURCE_ACCOUNT_NUMBER: Joi.string().allow('').default(''),
});
