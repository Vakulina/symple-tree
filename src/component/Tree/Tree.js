import { useEffect, useState } from "react";
import ItemOfTree from '../ItemOfTree/ItemOfTree';
const URL = 'https://pika-secret-ocean-49799.herokuapp.com/https://pastebin.com/raw/E0DcgH2d'

export default function Tree() {
  const [list, setList] = useState({})
  const [displayChildren, setDisplayChildren] = useState(null)

  useEffect(() => {
    fetchDataList()
  }, [])


  async function fetchDataList() {
    try {
      const response = await fetch(URL, { headers: { 'Content-Type': 'application/json' }, });
      const list = await response.json();
      setList(list);
    } catch (err) {
      console.log(err);  // перехватит любую ошибку в блоке try: и в fetch, и в response.json
    }
  }
  return (
    <>
      <ItemOfTree item={list} />
    </>
  )
}
