import { useEffect, useState } from "react";
import React from "react";
import ItemOfTree from '../ItemOfTree/ItemOfTree';
import './Tree.css'


function Tree() {
  const [list, setList] = useState({})
  const items = require('../../test1.json')
  const [activeItem, setActiveItem] = useState('')

  useEffect(() => {
    /*
     fetchDataList()
     .then((list)=>{
      setList(list)})*/
    setList(items)
  }, [])

useEffect(()=>{
  console.log("new activeItemPath,", activeItem)
},[activeItem])

  const handleClick = (id) => {
    setActiveItem(id)
    console.log("TRREE")
  }

  return (
    <>
      <ItemOfTree item={list}
        isDisplayChildren={true}    
        handleMarkingItem={handleClick}
        activeItem={activeItem}
      />
    </>
  )
}
export default Tree
