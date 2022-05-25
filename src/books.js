import React from "react";


function books({book}){
  const{titleURL,title,author,publisher,published,image} = book;
  return(
    <>
      <div className="book">
          <div className="book-title">
            <h2><a href={titleURL} target="_blank">{title}</a></h2>
          </div>
          <div className="book-img-block">
            <img className="book-img" src={image===undefined?null:image} alt={title} />
          </div>
          <div className="book-desc">
            <div className="book-field"><strong>Author:</strong>{author}</div>
            <div className="book-field"><strong>Publisher:</strong>{publisher}</div>
            <div className="book-field"><strong>Published:</strong>{published}</div>
          </div>
        </div>
    </>
  )
}

export default books;
