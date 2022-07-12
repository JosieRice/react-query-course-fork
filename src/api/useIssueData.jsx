import axios from "axios";
import { useQuery } from "react-query";

const useIssueData = (issueNumber) => {
  const getIssues = ({ signal }) =>
    axios.get(`/api/issues/${issueNumber}`, { signal }).then((res) => res.data);

  return useQuery(["issues", issueNumber], getIssues, { staleTime: 1000 * 60 });
};

export default useIssueData;
