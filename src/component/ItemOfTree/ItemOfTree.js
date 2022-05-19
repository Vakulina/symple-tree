import { useEffect, useState } from "react";
import "./ItemOfTree.css"

export default function ItemOfTree({ item, onClick, isDisplayChildren, className }) {
  const [childrenList, setChildrenList] = useState(null) //элементы списка
  const [visibilityChildren, setVisibilityChildren] = useState([]); //состояние показа подсписка для каждого элемента открытого списка

  const handleClick = (e, i, index) => { //свернуть/развернуть 
    e.stopPropagation();
    console.log(childrenList,visibilityChildren,i)
    if (i['childNodes']){

    const newVisibilityChildren = [...visibilityChildren];
    newVisibilityChildren[index] = !visibilityChildren[index];
    setVisibilityChildren(newVisibilityChildren);
    }
  }

  useEffect(() => {
    const arr = [];
    const children = item["childNodes"];
    if (item && children) {
      setChildrenList(children);
      // setItemClassName('item_closed')
      children.forEach((i, index) => { //используем индекс массива,т.к. порядок элементов массива у нас не меняется и наше API не предоставляет уникальный id
        arr[index] = false;
      });
      setVisibilityChildren(arr);
    }
  }, [item]);

  let displayChildren = null;

  if ((childrenList != null) && (isDisplayChildren)) {
    const className = (index, i) => {
      if (visibilityChildren[index]) {
        return 'item_opened'
      }
      else if (!visibilityChildren[index] && i["childNodes"]) {
        return 'item_closed'
      }
    }

    displayChildren = (
      <ul >
        {childrenList.map((i, index) => (
          <ItemOfTree
            item={i}
            key={index}
            isDisplayChildren={visibilityChildren[index]}
            onClick={(e) => handleClick(e, i, index)}
            className={className(index, i)}
          />
        ))}
      </ul>
    );
  }


  return (
    <li onClick={onClick} className={className}>
      {item && item["title"]}
      {displayChildren}
    </li>
  );
}