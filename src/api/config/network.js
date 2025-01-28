import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const request = async (options) => {
  try {
    let token;
    // const state = store.getState();
    const userState = null;
    if (userState === null) {
      token = "";
    } else {
      const { accessToken } = userState;
      token = accessToken;
    }
    // Set the authorization header
    token !== "" &&
      (client.defaults.headers.common.Authorization = `Bearer ${token}`);

    const onSuccess = (response) => {
      return response?.data;
    };

    const onError = (error) => {
      return Promise.reject(error.response?.data);
    };

    var response = await client(options).then(onSuccess).catch(onError);

    return client(options).then(onSuccess).catch(onError);
  } catch (e) {}
};
