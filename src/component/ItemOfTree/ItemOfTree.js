import { useEffect, useState } from "react";

export default function ItemOfTree({ item, onClick, isDisplayChildren }) {
  const [childrenList, setChildrenList] = useState(null)
  const [visibilityChildren, setVisibilityChildren] = useState([]);

  const handleClick = (e, index) => {
    e.stopPropagation()
    const newVisibilityChildren = [...visibilityChildren]
    newVisibilityChildren[index] = !visibilityChildren[index]
    setVisibilityChildren(newVisibilityChildren)
  }

  useEffect(() => {

    //console.log(item["childNodes"], isDisplayChildren)
    const obj = []
    if (item && item["childNodes"]) {
      setChildrenList(item["childNodes"])
      item["childNodes"].map((i, index) => {
        obj[index] = false
      })
    }
    setVisibilityChildren(obj)
  }, [item])

  let children = null

  if ((childrenList != null) && (isDisplayChildren)) {
    children = (
      <ul>
        {childrenList.map((i, index) => (
          <ItemOfTree item={i} key={index} isDisplayChildren={visibilityChildren[index]} onClick={(e) => handleClick(e, index)} />
        ))}
      </ul>
    );
  }

  return (
    <li onClick={onClick}>
      {item && item["title"]}
      {children}
    </li>
  );
}