import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { User } from '../models/user.js';

export const authenticate = async (req, res, next) => {
    const { accessToken, sessionId } = req.cookies;
  if (!accessToken) {
    return next(createHttpError(401, 'Missing access token'));
  }

  const session = await Session.findOne({
    accessToken, _id: sessionId
  });

  if (!session) {
    next(createHttpErrorcreateHttpError(401, 'Session not found'));
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(createHttpErrorcreateHttpError(401, 'Access token expired'));
  }

  const user = await User.findById(session.userId);

  if (!user) {
      return next(createHttpError(401, 'User not found'));
  }

  req.user = user;

  next();
};