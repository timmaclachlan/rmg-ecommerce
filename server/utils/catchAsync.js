// server/utils/asyncHandler.js

//export default function asyncHandler(fn) {
//  return function (req, res, next) {
//    Promise.resolve(fn(req, res, next)).catch(next);
//  };
//}

export const catchAsync = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default catchAsync;
