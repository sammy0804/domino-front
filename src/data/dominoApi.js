export async function postGetResultChain(listDomino) {
  const url = "http://localhost:5000/Domino";
  
  const response = await window.fetch(url,{
    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(listDomino)
  });

  if (!response.ok) {
    return response.status;
  }
  
  return response.json();
}