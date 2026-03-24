import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
    console.error(err);

    const isProd = process.env.NODE_ENV === 'production';

    let status = 500;
    let message = "Something went wrong. Please try again later.";

    if (createHttpError.isHttpError(err)) {
        status = err.status;
        message = isProd && status === 500 ? message : err.message;
    } else if (!isProd) {

        message = err.message;
    }

    res.status(status).json({ message });
};