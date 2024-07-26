import React from 'react';
import MainPage from '../../features/mainpage/mainpage';
import { fetchData } from '../../utils/fetchdata';
import { LaunchResponse } from '../../interfaces/interface';
import Fail from "../app/Error"

export default async function Home() {
  const initialPage = 1;
  const initialSearch = '';

  let data: LaunchResponse | null = null;
  try {
    data = await fetchData(initialPage, initialSearch);
  } catch (error) {
    console.error('failed :', error);
  }

  return (
    <div className="container mx-auto">
      <div className="p-5 bg-indigo-950 border-solid border-2 border-sky-500 rounded-xl">
        {data ? (
          <MainPage initialData={data} initialPage={initialPage} initialSearch={initialSearch} />
        ) : (
          <Fail />
        )}
      </div>
    </div>
  );
}
