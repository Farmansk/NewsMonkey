import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true);
        let data = await fetch(url);
        let ParsedData = await data.json()
        setArticles(ParsedData.articles);
        setLoading(false);
        setTotalResults(ParsedData.totalResults);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
        updateNews();
        // eslint-disable-next-line
    }, [])

    // const HandlePrevClick = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}&pageSize=${props.pageSize}`
    //     let data = await fetch(url);
    //     let ParsedData = await data.json()
    //     setPage(page - 1);
    //     setArticles(ParsedData.articles);
    //     setTotalResults(ParsedData.totalResults);
    // }

    // const HandleNextClick = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
    //     let data = await fetch(url);
    //     let ParsedData = await data.json()
    //     setPage(page + 1);
    //     setArticles(ParsedData.articles);
    //     setTotalResults(ParsedData.totalResults);
    // }

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        let data = await fetch(url);
        let ParsedData = await data.json()
        setPage(page + 1);
        setArticles(articles.concat(ParsedData.articles));
        setTotalResults(ParsedData.totalResults);
    }

    return (
        <>
            <h1 className="text-center" style={{ margin: '25px 0px', marginTop: '90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage ? element.urlToImage : "https://previews.123rf.com/images/alhovik/alhovik1709/alhovik170900031/86481591-antecedentes-de-las-noticias-de-%C3%BAltima-hora-world-global-tv-news-banner-design.jpg"}
                                    newsUrl={element.url}
                                    author={element.author ? element.author : "Unknown"}
                                    date={new Date(element.publishedAt).toGMTString()}
                                    source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

            {/* <div className="container d-flex justify-content-between">
                    <button disabled={page <= 1} type="button" className="btn btn-primary" onClick={HandlePrevClick}> &larr; Previous </button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-primary" onClick={HandleNextClick}> Next &rarr; </button>
                </div> */}
        </>
    )
}

News.defaultProps = {
    pageSize: 10,
    category: 'general'
}

export default News