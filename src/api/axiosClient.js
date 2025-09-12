// api/axiosClient.js
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "firebaseConfig";
import queryString from "query-string";

const getFirebaseToken = async () => {
  const currentUser = getAuth().currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken();
    return token;
  }

  //Logged in but currentUser is not fetched --> wait 10s
  return new Promise((resolve, reject) => {
    const unregister = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        reject(null);
      }
      const token = await user.getIdToken();
      //   console.log("[AXIOS] User token: ", token);
      resolve(token);
      unregister();
    });
  });
};

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  //   const currentUser = getAuth().currentUser;
  //   if (currentUser) {
  //     const token = await currentUser.getIdToken();
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  const token = await getFirebaseToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);

export default axiosClient;
