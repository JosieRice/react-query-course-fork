import axios from "axios";
import { useQuery } from "react-query";

const useLabelsData = () => {
  const getLabels = ({ signal }) =>
    axios.get(`/api/labels`, { signal }).then((res) => res.data);

  return useQuery(["labels"], getLabels, { staleTime: 1000 * 60 * 60 });
};

export default useLabelsData;
