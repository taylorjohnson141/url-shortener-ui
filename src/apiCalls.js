export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
      .then(data => data.urls)
}
export const postUrls = (dataToSubmit) =>{
  let formattedData = {
    long_url:dataToSubmit.urlToShorten,
    title:dataToSubmit.title
  }
  let stringifiedData = JSON.stringify(formattedData)
  console.log(stringifiedData)
  return fetch('http://localhost:3001/api/v1/urls',{
    method:'POST',
    body:stringifiedData,
    headers:{
      "Content-type":"application/json"
    }
  }).then(response =>response.json())
}
export const deleteCard = (id) =>{

  return fetch(`http://localhost:3001/api/v1/urls/${id}`,{
    method:'DELETE',
    headers:{
      "Content-type":"application/json"
    }
  })
}