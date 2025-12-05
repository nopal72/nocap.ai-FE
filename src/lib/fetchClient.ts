// export async function fetchClient<T>(path: string, method: string = 'GET', body:T | null = null) {
//     const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL ;
//   const response = await fetch(`${apiBaseUrl}${path}`, {
//         method: method,
//         headers: {
//           'Content-Type': 'application/json',
//           'Origin': "http://localhost:3000",
//         },
//         body: JSON.stringify(body),
//       });
//     return response;
// }

import axios from "axios";


const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // "Origin": "http://localhost:3000",
  },
});

export default apiInstance;