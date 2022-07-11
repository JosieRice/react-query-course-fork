import axios from "axios";
import { useQuery } from "react-query";

const useIssueComments = (issueNumber) => {
  const getIssueComments = () =>
    axios.get(`/api/issues/${issueNumber}/comments`).then((res) => res.data);

  return useQuery(["issues", issueNumber, "comments"], getIssueComments, {
    staleTime: 1000 * 60,
  });
};

export default useIssueComments;