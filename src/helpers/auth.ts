import { verifyToken  } from "../utils/auth";
import {authorizationError} from "./errors"

import { NextFunction, Request } from "express";

export const validateAuthor = (req, _res, next: NextFunction) => {
    const {authorization} = req.headers
    if (!authorization) {
        throw new authorizationError("token not provided")
    }

   verifyToken(authorization)
   return next()
}