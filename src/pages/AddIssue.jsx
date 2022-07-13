import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export default function AddIssue() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addIssue = useMutation(
    (issueBody) => axios.post(`/api/issues`, { issueBody }),
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries(["issues"], { exact: true });
        queryClient.setQueriesData(["issues", data.number.toString()], data);
        navigate(`/issue/${data.number}`);
      },
    }
  );

  return (
    <div className="add-issue">
      <h2>Add Issue</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (addIssue.isLoading) return;
          addIssue.mutate({
            comment: e.target.comment.value,
            title: e.target.title.value,
          });
        }}
      >
        <label htmlFor="title">Title</label>
        <input type="text" id="title" placeholder="title" name="title" />
        <label htmlFor="comment">Comment</label>
        <textarea placeholder="Comment" id="comment" name="comment" />
        <button type="submit" disabled={addIssue.isLoading}>
          {addIssue.isLoading ? "Adding Issue" : "Add Issue"}
        </button>
      </form>
    </div>
  );
}
