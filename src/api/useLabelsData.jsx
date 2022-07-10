import axios from "axios";
import { useQuery } from "react-query";

const useLabelsData = () => {
  const getLabels = () => axios.get(`/api/labels`).then((res) => res.data);

  return useQuery(["labels"], getLabels);
};

export default useLabelsData;
