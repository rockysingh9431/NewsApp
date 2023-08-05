import React from 'react'

export default function NewsItem(props) {
    let { title, description, imgUrl, newsUrl, author, date, source } =props;
    return (
      <div className="container card my-3">
        <img src={!imgUrl ? "https://thumbs.dreamstime.com/b/news-42301371.jpg" : imgUrl} className="card-img-top my-2" alt="..." />
        <div className="badge" style={{display: 'flex',
                  justifyContent:'flex-end',
                  position:'absolute',
                  right: 0
              }}>
          <span className="badge rounded-pill bg-danger">
            {source.name}
          </span>
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}....</p>
          <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
          <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
        </div>
      </div>
    )
}