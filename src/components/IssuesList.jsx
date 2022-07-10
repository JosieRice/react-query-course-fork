import axios from "axios";
import { useQuery } from "react-query";
import { IssueItem } from "./IssueItem";

export default function IssuesList({ labels }) {
  const { data, isLoading } = useQuery(["issues", { labels }], () => {
    const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
    return axios.get(`/api/issues?${labelsString}`).then((res) => res.data);
  });

  return (
    <div>
      <h2>Issues List</h2>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <ul className="issues-list">
          {data.map((issue) => (
            <IssueItem key={issue.id} issue={issue} />
          ))}
        </ul>
      )}
    </div>
  );
}
