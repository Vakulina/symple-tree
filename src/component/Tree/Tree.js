import { useEffect, useState } from "react";
import ItemOfTree from '../ItemOfTree/ItemOfTree';
import './Tree.css'

export default function Tree() {
  const [list, setList] = useState({})
  const items=require('../../test.json')
  
  useEffect(() => {
   /*
    fetchDataList()
    .then((list)=>{
     setList(list)})*/
     setList(items)
  }, [])

  
  return (
    <>
      <ItemOfTree item={list} isDisplayChildren={true} className={''} />
    </>
  )
}
