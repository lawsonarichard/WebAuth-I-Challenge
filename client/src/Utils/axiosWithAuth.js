import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      Token: token
    }
  });
};

export default axiosWithAuth;
