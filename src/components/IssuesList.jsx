import axios from "axios";
import { useQuery } from "react-query";
import { IssueItem } from "./IssueItem";
import { useState } from "react";
import useSearch from "../api/useSearch";
import Loader from "./Loader";

export default function IssuesList({ labels, status }) {
  const [searchValue, setSearchValue] = useState("");

  const issuesQuery = useQuery(
    ["issues", { labels, status }],
    async ({ signal }) => {
      const statusString = status ? `&status=${status}` : "";
      const labelsString = labels.map((label) => `labels[]=${label}`).join("&");
      return axios
        .get(`/api/issues?${labelsString}${statusString}`, { signal })
        .then((res) => res.data);
    }
  );

  const searchQuery = useSearch(searchValue);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchValue(e.target.elements.search.value);
        }}
      >
        <label htmlFor="search">Search Issues</label>
        <input
          type="search"
          placeholder="Search"
          name="search"
          id="search"
          onChange={(e) => {
            e.preventDefault();
            if (e.target.value.length === 0) setSearchValue("");
          }}
        ></input>
      </form>

      <h2>Issues List {issuesQuery.isFetching && <Loader />}</h2>
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : issuesQuery.isError ? (
        <p>{issuesQuery.error.message}</p>
      ) : searchQuery.fetchStatus === "idle" &&
        searchQuery.isLoading === true ? (
        <ul className="issues-list">
          {issuesQuery.data.map((issue) => (
            <IssueItem key={issue.id} issue={issue} />
          ))}
        </ul>
      ) : (
        <>
          <h2>Search Results</h2>
          {searchQuery.isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>{searchQuery.data.count} Results</p>
              <ul className="issues-list">
                {searchQuery.data.items.map((issue) => (
                  <IssueItem key={issue.id} issue={issue} />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
