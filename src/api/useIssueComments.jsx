import axios from "axios";
import { useQuery } from "react-query";

const useIssueComments = (issueNumber) => {
  const getIssueComments = ({ signal }) =>
    axios
      .get(`/api/issues/${issueNumber}/comments`, { signal })
      .then((res) => res.data);

  return useQuery(["issues", issueNumber, "comments"], getIssueComments);
};

export default useIssueComments;
