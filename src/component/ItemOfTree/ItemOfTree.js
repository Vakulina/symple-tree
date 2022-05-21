import { useEffect, useState } from "react";
import React from "react";
import "./ItemOfTree.css"

function ItemOfTree({ item, isDisplayChildren, activeItem, handleMarkingItem, className, onClick}) {
  const [childrenList, setChildrenList] = useState(null) //элементы списка
  const [visibilityChildren, setVisibilityChildren] = useState([]); //состояние показа подсписка для каждого элемента открытого списка
 //console.log(activeItemPath)
 const getActiveElementFromPath =(path)=>{
   return path.slice(path.lastIndexOf("/")+1)
 }

//const [activeElement, setActiveElement] = useState(activeItem)
//const [activeElement, setActiveElement] = useState( getActiveElementFromPath(activeItem)||null)


  const handleClick = (e, i, index) => { //свернуть/развернуть 
    e.stopPropagation();
    handleMarkingItem(i.id)
 
    if (i['nodes']) {
      const newVisibilityChildren = [...visibilityChildren];
      newVisibilityChildren[index] = !visibilityChildren[index];
      setVisibilityChildren(newVisibilityChildren);
      console.log("KKK")
     
    }
    else {
    }
  }

  useEffect(() => {
    const arr = [];
    const children = item["nodes"];
    if (item && children) {
      setChildrenList(children);
      children.forEach((i, index) => { //используем индекс массива,т.к. порядок элементов массива у нас не меняется и наше API не предоставляет уникальный id
        arr[index] = false;
         });
      setVisibilityChildren(arr);
    }
    
   // setActiveElement(getActiveElementFromPath(activeItem))
  }, [item]);

  const getClassName = (index, i) => {
    if (visibilityChildren[index]) {
      return 'item_opened'
    }
    else if (!visibilityChildren[index] && i["nodes"]) {
      return 'item_closed'
    }
    else {
  const classStr = (activeItem === i.id) ? 'active' : '';
     
    return classStr
    }
  }

  const renderDisplayChildren = () => {
    if (childrenList && isDisplayChildren) {
      return (
        <ul>
          {
            childrenList.map((i, index) => (
              <ItemOfTree
                item={i}
                key={i.id}
    
                isDisplayChildren={visibilityChildren[index]}
                onClick={(e) => handleClick(e, i, index)}
                className={`${getClassName(index, i)} }`}
                handleMarkingItem={ handleMarkingItem}
                activeItem={activeItem}
              />
            ))
          }
        </ul>
      );
    }
  }
  return (
    <li onClick={onClick} className={className}  >
      {item && item["title"]}
      {renderDisplayChildren()}
    </li>
  );
}
export default ItemOfTree