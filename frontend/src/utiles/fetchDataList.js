const URL = 'https://tree-9egp.onrender.com/'

 export default async function fetchDataList() {
    try {
      const response = await fetch(URL, { headers: { 'Content-Type': 'application/json' }, });
      const list = await response.json();
      return list;
    } catch (err) {
      console.log(err);  // перехватит любую ошибку в блоке try: и в fetch, и в response.json
    }
  }
