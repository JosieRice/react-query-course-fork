import { GoComment, GoIssueClosed, GoIssueOpened } from "react-icons/go";
import { Link } from "react-router-dom";
import { relativeDate } from "../helpers/relativeDate";
import useUserData from "../api/useUserData";
import { Label } from "./Label";
import { useQueryClient } from "react-query";
import axios from "axios";

export function IssueItem({ issue }) {
  const {
    comments,
    assignee,
    createdBy,
    createdDate,
    labels,
    number,
    status,
    title,
  } = issue;

  const commentCount = comments.length;

  const { data: assigneeUser, isSuccess: assigneeUserIsSuccess } =
    useUserData(assignee);
  const { data: createdByUser, isSuccess: createdByUserIsSuccess } =
    useUserData(createdBy);

  const queryClient = useQueryClient();

  return (
    <li
      onMouseEnter={() => {
        queryClient.prefetchQuery(["issues", number.toString()], () =>
          axios.get(`/api/issues/${number}`).then((res) => res.data)
        );

        queryClient.prefetchQuery(
          ["issues", number.toString(), "comments"],
          () =>
            axios.get(`/api/issues/${number}/comments`).then((res) => res.data)
        );
      }}
    >
      <div>
        {status === "done" || status === "cancelled" ? (
          <GoIssueClosed style={{ color: "red" }} />
        ) : (
          <GoIssueOpened style={{ color: "green" }} />
        )}
      </div>
      <div className="issue-content">
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map((label) => (
            <Label key={label} label={label} />
          ))}
          <small>
            # {number} opened {relativeDate(createdDate)}{" "}
            {createdByUserIsSuccess && `by ${createdByUser.name}`}
          </small>
        </span>
      </div>
      {assignee && (
        <img
          src={assigneeUserIsSuccess ? assigneeUser.profilePictureUrl : ""}
          className="assigned-to"
          alt={`Assigned to ${
            assigneeUserIsSuccess ? assigneeUser.name : "avatar"
          }`}
        />
      )}
      <span className="comment-count">
        {commentCount > 0 ? (
          <>
            <GoComment /> {commentCount}
          </>
        ) : null}
      </span>
    </li>
  );
}
