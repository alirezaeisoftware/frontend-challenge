"use client";

import React, { useEffect, useState } from "react";
import Pagination from "../pagination/pagination";
import Loading from "../../src/app/loading";
import { LaunchResponse, MainComponent } from "../../interfaces/interface";

const MainPage = ({
  initialData,
  initialPage,
  initialSearch,
}: MainComponent) => {
  const [data, setData] = useState<LaunchResponse | null>(initialData);
  const [page, setPage] = useState<number>(initialPage);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>(initialSearch);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.spacexdata.com/v5/launches/query",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: search
                ? {
                    $or: [
                      { name: { $regex: search, $options: "i" } },
                      { details: { $regex: search, $options: "i" } },
                      { date_utc: { $regex: search, $options: "i" } },
                    ],
                  }
                : {},
              options: {
                page: page,
                limit: limit,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error("failed");
        }

        const data: LaunchResponse = await response.json();
        setData(data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, search]);

  const handlePageChange = (newPage: number) => {
    if (data && newPage >= 1 && newPage <= data.totalPages) {
      setPage(newPage);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  return (
    <>
      
      <div className="flex flex-col w-full">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="search"
          className="mb-4 p-2 placeholder-gray-50 outline-none text-white-800 bg-indigo-500 rounded-xl border-2 border-white-500"
        />

        {loading ? (
          <Loading />
        ) : (
          <>
            {data?.docs?.length === 0 ? (
              <div className="text-center mt-4">
                <p>not found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                {data?.docs?.map((item) => (
                  <div
                    className="bg-blue-700 p-4 m-1 flex flex-col gap-3 rounded-xl"
                    key={item.id}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "10rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#f5f5f5",
                        borderRadius: "10px",
                        padding: "1.25rem",
                      }}
                    >
                      <img
                        src={
                          item.links.patch.small ||
                          "https://www.spacex.com/static/images/share.jpg"
                        }
                        alt={item.name}
                        style={{ width: "10rem", padding: ".5rem" }}
                      />
                    </div>
                    <p>Name : {item.name}</p>
                    <p>
                      Date :
                      {new Date(item.date_utc).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        timeZoneName: "short",
                      })}
                    </p>
                    <p className="truncate mt-3">{item.details}</p>
                  </div>
                ))}
              </div>
            )}

            <Pagination
              className="mt-6"
              currentPage={page}
              totalPages={data?.totalPages ?? 1}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </>
  );
};

export default MainPage;
