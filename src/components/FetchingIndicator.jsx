import { useIsFetching } from "react-query";
import Loader from "./Loader";

const FetchingIndicator = () => {
  const isFetching = useIsFetching();

  if (isFetching)
    return (
      <div className="fetching-indicator">
        <Loader />
      </div>
    );

  return null;
};

export default FetchingIndicator;
