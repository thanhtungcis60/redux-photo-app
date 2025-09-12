import { getAuth } from "firebase/auth";

const userApi = {
  getMe: () => {
    //TODO: Call api to get current user info
    return new Promise((resolve, reject) => {
      reject(new Error("MY CUSTOM ERROR"));
      return;
      setTimeout(() => {
        const currentUser = getAuth().currentUser;
        resolve({
          id: currentUser?.uid,
          name: currentUser?.displayName,
          email: currentUser?.email,
          photoURL: currentUser?.photoURL,
        });
      }, 500);
    });
  },
};

export default userApi;
