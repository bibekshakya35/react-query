import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
  } = useInfiniteQuery(
    "sw-species",
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    { getNextPageParam: (lastPage) => lastPage.next || undefined }
  );
  if (isLoading) return <div>Loading</div>;
  if (isError) return <div>Error! ${error.toString()}</div>;
  return (
    <React.Fragment>
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {data.pages.map((pageData) => {
          return pageData.results.map((specy) => (
            <Species
              name={specy.name}
              language={specy.language}
              averageLifespan={specy.average_lifespan}
            />
          ));
        })}
      </InfiniteScroll>
      {isFetching ? <div>Loading</div> : null}
    </React.Fragment>
  );
}
