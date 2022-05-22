import { useEffect, useState } from "react";
import ItemOfTree from '../ItemOfTree/ItemOfTree';
import './Tree.css'
import bellImg from '../images/bell.png';
import fetchDataList from "../../utiles/fetchDataList";


function Tree() {
  const [list, setList] = useState({})
  const [activeItem, setActiveItem] = useState('')

  useEffect(() => {
     fetchDataList()
     .then((list)=>{
      setList(list)})
  }, [])

  const handleClick = (id) => {
    setActiveItem(id)
  }

  return (
    <ul className="tree">
      <img src={ bellImg } alt="bell"/>
      <span className="tree-name">master</span>
      <ItemOfTree item={list}
        isDisplayChildren={true}
        handleMarkingItem={handleClick}
        activeItem={activeItem}
      />
    </ul>
  )
}
export default Tree;
