import axios from "axios";
import { useQuery } from "react-query";

const useSearch = (searchValue) => {
  const runSearch = () =>
    axios.get(`/api/search/issues?q=${searchValue}`).then((res) => res.data);

  return useQuery(["issues", "search", searchValue], runSearch, {
    enabled: searchValue.length > 0,
  });
};

export default useSearch;
