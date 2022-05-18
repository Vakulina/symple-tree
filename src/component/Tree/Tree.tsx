import { useEffect } from "react";

const URL = 'https://pika-secret-ocean-49799.herokuapp.com/https://pastebin.com/raw/E0DcgH2d'

export default function Tree() {
  useEffect(() => {
    fetchDataList()
  }, [])

  async function fetchDataList() {

    try {
      const response = await fetch(URL, { headers: { 'Content-Type': 'application/json' }, });
      const list = await response.json();
      console.log(list, '8666')
    } catch (err) {
      console.log(err);  // перехватит любую ошибку в блоке try: и в fetch, и в response.json
    }
  }
  return (
    <>
      88888
    </>
  )
}

