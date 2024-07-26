export const fetchData = async (page: number, search: string) => {
    const response = await fetch('https://api.spacexdata.com/v5/launches/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: search
          ? {
              $or: [
                { name: { $regex: search, $options: 'i' } },
                { details: { $regex: search, $options: 'i' } },
                { date_utc: { $regex: search, $options: 'i' } },
              ],
            }
          : {},
        options: {
          page: page,
          limit: 10,
        },
      }),
    });
  
    if (!response.ok) {
      throw new Error('failed to fetch data');
    }
  
    return response.json();
  };
  