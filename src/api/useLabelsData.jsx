import axios from "axios";
import { useQuery } from "react-query";
import { defaultLabels } from "../helpers/defaultData";

const useLabelsData = () => {
  const getLabels = ({ signal }) =>
    axios.get(`/api/labels`, { signal }).then((res) => res.data);

  return useQuery(["labels"], getLabels, {
    staleTime: 1000 * 60 * 60,
    placeholderData: defaultLabels,
  });
};

export default useLabelsData;
