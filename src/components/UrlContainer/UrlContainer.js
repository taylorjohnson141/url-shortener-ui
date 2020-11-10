import React from 'react';
import './UrlContainer.css';

const UrlContainer = props => {
  const urlEls = props.urls.map((url, index)=> {
    console.log(index)
    return (
      <div key = {index} className="url">
        <h3>{url.title}</h3>
        <a role = {`short-url${index}`}href={url.short_url} target="blank">{url.short_url}</a>
        <p>{url.long_url}</p>
        <button role ={`button${url.id}`}onClick ={() =>{
          props.deleteURl(url.id)
        }}>Delete
        </button>
      </div>
    )
  });

  return (
    <section>
      { urlEls.length ? urlEls : <p>No urls yet! Find some to shorten!</p> }
    </section>
  )
}

export default UrlContainer;
