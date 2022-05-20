import { useEffect, useState } from "react";
import React from "react";
import ItemOfTree from '../ItemOfTree/ItemOfTree';
import './Tree.css'

 function Tree() {
  const [list, setList] = useState({})
  const items=require('../../test.json')


  

  useEffect(() => {
   /*
    fetchDataList()
    .then((list)=>{
     setList(list)})*/
     setList(items)
     console.log(items.childNodes)
     
  }, [])

  
  return (
    <>
      <ItemOfTree item={list} isDisplayChildren={true}  />
     
    </>
  )
}
export default React.memo(Tree)
