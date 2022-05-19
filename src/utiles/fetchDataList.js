const URL = 'https://cors-anywhere.herokuapp.com/https://pastebin.com/raw/E0DcgH2d'

 export default async function fetchDataList() {
    try {
      const response = await fetch(URL, { headers: { 'Content-Type': 'application/json' }, });
      const list = await response.json();
      return list;
    } catch (err) {
      console.log(err);  // перехватит любую ошибку в блоке try: и в fetch, и в response.json
    }
  }