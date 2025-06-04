import { request } from "../config/network";
export const getRequestType = () =>
  request({ url: "/getRequestType", method: "GET" });

export const getRequisitionSubtypeByRequisitionTypeId = (RequisitionTypeId) =>
  request({
    url: `/getRequisitionSubtypeByRequisitionTypeId?RequisitionTypeId=${RequisitionTypeId}`,
    method: "GET",
  });
export const getRequestByUserId = (userId) =>
  request({ url: `/getRequestByUserId/${userId}`, method: "GET" });

export const createRequests = (data) =>
  request({ url: "/createRequest", method: "POST", data });
export const updateRequests = (data) =>
  request({ url: "/updateRequest", method: "POST", data });
