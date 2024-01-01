import type { MetaFunction } from "@remix-run/node";
import { json} from '@remix-run/node';

import { useLoaderData } from "@remix-run/react";

import {getStats} from "../models/Test.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ( ) => {
  const data = await getStats();

  return json(data)
}


export default function Index() {
  const {data} = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>

      {data && data.map( (item, i) => {
        return <div>{item.id}: {item.name} ({item.email})</div>
      })}

    </div>
  );
}
