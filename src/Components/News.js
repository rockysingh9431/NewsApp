import React, {useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
export default function News(props) {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    setArticles(parsedData.articles)
    props.setProgress(100)
  }
  useEffect(() => {
    updateNews();
    document.title = `NewsMonkey-${capitalizeFirstLetter(props.category)}`
  }, [])

  const fetchMoreData = async () => {
    setPage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    setTotalResults(parsedData.totalResults)
    setArticles(articles.concat(parsedData.articles))
  };
    return (
      <>
        <h2 className="text-center mb-3">NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
        {loading && <Spinner/>}
        <InfiniteScroll dataLength={articles.length} hasMore={articles.length !== totalResults} next={fetchMoreData} loader={<Spinner />}>
          <div className='container my-3'>
            <div className="row">
              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    )
  }
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}