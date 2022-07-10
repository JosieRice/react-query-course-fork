import axios from "axios";
import { useQuery } from "react-query";

const useUserData = (userId: string) => {
  const getUsers = () =>
    axios.get(`/api/users/${userId}`).then((res) => res.data);

  return useQuery(["users", userId], getUsers);
};

export default useUserData;
