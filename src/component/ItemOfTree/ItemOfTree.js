import { useEffect, useState } from "react";
import React from "react";
import "./ItemOfTree.css"

function ItemOfTree({ item, isDisplayChildren, activeItem, handleMarkingItem, className, onClick }) {
  const [childrenList, setChildrenList] = useState(null) //элементы списка
  const [visibilityChildren, setVisibilityChildren] = useState([]); //состояние показа подсписка для каждого элемента открытого списка

  const handleClick = (e, i, index) => { //свернуть/развернуть/выделить активный элемент по onClick
    e.stopPropagation();
    handleMarkingItem(i.id);

    if (i['nodes']) {
      const newVisibilityChildren = [...visibilityChildren];
      newVisibilityChildren[index] = !visibilityChildren[index];
      setVisibilityChildren(newVisibilityChildren);
    }
  }

  useEffect(() => {
    const arr = [];
    const children = item["nodes"];
    if (item && children) { //запишем в childrenList - дочерние элементы списка, а в массив visibilityChildren - нужно их отражать на странице или нет
      setChildrenList(children);
      children.forEach((i, index) => { 
        arr[index] = false;
      });
      setVisibilityChildren(arr);
    }
  }, [item]);

  const getClassName = (index, i) => { //ф-я определяет, какие класы добавить элементу списка
    if (visibilityChildren[index]) {
      return 'item_opened';
    }
    else if (!visibilityChildren[index] && i["nodes"]) {
      return 'item_closed';
    }
    else {
      const classStr = (activeItem === i.id) ? 'active' : '';
      return classStr;
    }
  }

  const renderDisplayChildren = () => {  //ф-я составления вложенных элементов для последующего рендера
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
                handleMarkingItem={handleMarkingItem}
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
export default React.memo(ItemOfTree);