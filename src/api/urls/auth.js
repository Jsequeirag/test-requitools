import { request } from "../utils/Network";
export const login = (data) => request({ url: "/login", method: "POST", data });
