import { useEffect, useState } from "react";

export default function ItemOfTree({ item }) {
  let children = null;
  if (item["childNodes"] && item["childNodes"].length) {
    children = (
      <ul>
        {item["childNodes"].map((i, index) => (
          <ItemOfTree item={i} key={index} />
        ))}
      </ul>
    );
  }

  return (
    <li>
      {item["title"]}
      {children}
    </li>
  );
}