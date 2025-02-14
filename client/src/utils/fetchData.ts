import { FetchMethodType, FetchRequestBody } from "../entities/types";

export const fetchData = async (
    url: string,
    method: FetchMethodType,
    body: FetchRequestBody
) => {
    const res = await fetch(`http://localhost:5000/api${url}`, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    const data = await res.json();

    return data;
};
