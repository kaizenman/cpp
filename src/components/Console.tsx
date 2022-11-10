import { useEffect, useState } from "react";
import useFetchString from "../hooks/useFetchString";

interface Post {
  method: string;
  body: string;
}

export const Console: React.FC = () => {
  const url = "https://godbolt.org/api/compiler/gsnapshot/compile?options=-Wall";
  const body = "int foo() { return 1; }";
  const { data, error } = useFetchString<Post[]>(url, { method: "POST", body });
  if (error) return <p className="Output">{"There is an error." + error}</p>;
  if (!data) return <p className="Output">Loading...</p>;

  const lines = data.map((line) => (
    <div>
      {" "}
      {(line as unknown as string).split(" ").map((word) => (
        <span>{"\t" + word}</span>
      ))}
    </div>
  ));

  return (
    <div className="Output">
      <div>{lines}</div>
      {/* {data.map((line) => (
        <div>{line as unknown as string}</div>
      ))} */}
    </div>
  );
};
