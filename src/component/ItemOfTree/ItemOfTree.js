import { useEffect, useState, useRef } from "react";
import "./ItemOfTree.css"

export default function ItemOfTree({ item, onClick, isDisplayChildren, className }) {
  const [childrenList, setChildrenList] = useState(null) //элементы списка
  const [visibilityChildren, setVisibilityChildren] = useState([]); //состояние показа подсписка для каждого элемента открытого списка
  const [itemClasses, setItemClasses] = useState([])
  const [outOfItem, setOutOfItem] = useState(false)

console.log(outOfItem)

  const handleClick = (e, i, index) => { //свернуть/развернуть 
    e.stopPropagation();
    if (i['childNodes']) {
      const newVisibilityChildren = [...visibilityChildren];
      newVisibilityChildren[index] = !visibilityChildren[index];
      setVisibilityChildren(newVisibilityChildren);
    }
    else {
      const newClasses = [...itemClasses.map((el, elIndex) => {
        return el = (elIndex === index) ? 'active' : '';
      })]
      console.log(newClasses)
      setItemClasses(newClasses)
    }
  }

  useEffect(() => {
    const arr = [];
    const classes = [];
    const children = item["childNodes"];
    if (item && children) {
      setChildrenList(children);

      // newVisibilityChildren('item_closed')
      children.forEach((i, index) => { //используем индекс массива,т.к. порядок элементов массива у нас не меняется и наше API не предоставляет уникальный id
        arr[index] = false;
        classes[index] = ''
      });
      setVisibilityChildren(arr);
      setItemClasses(classes)
    }
    //console.log(item)

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
            className={`${className(index, i)} ${itemClasses[index]}`}
          />
        ))}
      </ul>
    );
  }


  return (
    <li onClick={onClick} className={className}  >
      {item && item["title"]}
      {displayChildren}
    </li>
  );
}