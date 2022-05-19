import { useEffect, useState } from "react";
import "./ItemOfTree.css"

export default function ItemOfTree({ item, onClick, isDisplayChildren, className }) {
  const [childrenList, setChildrenList] = useState(null) //элементы списка
  const [visibilityChildren, setVisibilityChildren] = useState([]); //состояние показа подсписка для каждого элемента открытого списка
  //const className = !!displayChildren&&childrenList? 'item_opened' : 'item_closed'
  //const [itemClassName, setItemClassName]= useState('')

  const handleClick = (e, index) => { //свернуть/развернуть 
    e.stopPropagation();
    const newVisibilityChildren = [...visibilityChildren];
    newVisibilityChildren[index] = !visibilityChildren[index];
    setVisibilityChildren(newVisibilityChildren);
    console.log(newVisibilityChildren)
    // (!newVisibilityChildren[index])? setItemClassName('item_opened'): setItemClassName('item_closed')
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
    displayChildren = (
      <ul >
        {childrenList.map((i, index) => (
          <ItemOfTree
            item={i}
            key={index}
            isDisplayChildren={visibilityChildren[index]}
            onClick={(e) => handleClick(e, index)}
            className={(visibilityChildren[index] && 'item_opened') || ((!visibilityChildren[index] && i["childNodes"]) && 'item_closed')}
          />
        ))}
      </ul>
    );
  }

  console.log(childrenList)

  return (
    <li onClick={onClick} className={className}>
      {item && item["title"]}
      {displayChildren}
    </li>
  );
}