import { GoComment, GoIssueClosed, GoIssueOpened } from "react-icons/go";
import { Link } from "react-router-dom";
import { relativeDate } from "../helpers/relativeDate";

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

  return (
    <li>
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
            <div key={label}>
              <span className={`label red`}>{label}</span>
              <small>
                # {number} opened {relativeDate(createdDate)} by {createdBy}
              </small>
            </div>
          ))}
        </span>
      </div>
      {assignee && <div>{assignee}</div>}
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
