import axios from "axios";
import { useQuery } from "react-query";

const useUserData = (userId) => {
  const getUsers = () =>
    axios.get(`/api/users/${userId}`).then((res) => res.data);

  return useQuery(["users", userId], getUsers, {
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
};

export default useUserData;
