import React, {Component} from 'react';
import './GNewsWidget.css';

class GNewsWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      news: null,
      newsToDisplay: ''
    };
  }

  componentDidMount() {
    const {ApiKey, country = 'us'} = this.props;
    var url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${ApiKey}`;

    this.loadNews(url);
  }

  /**
   * Retrieves a set of news from the API
   * @param url Url to the API
   */
  loadNews(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Allows to get a news as soon as the app is loaded
        this.setState({news: data, newsToDisplay: data['articles'][0]});
      });
  }

  /**
   * Selects a news to display from the set of news
   */
  getOneNews() {
    const {news} = this.state;
    const random = Math.floor(Math.random() * news['totalResults']);
    this.setState({newsToDisplay: news['articles'][random]});
  }

  render() {
    const {newsToDisplay} = this.state;
    const {refreshNewsMilliseconds = 10000} = this.props;

    /**
     * Select another news to display every X seconds
     */
    setTimeout(() => {
      this.getOneNews();
    }, refreshNewsMilliseconds);

    const img = newsToDisplay['urlToImage'] ? <img className="image" src={newsToDisplay['urlToImage']} alt="news img"/> : null;

    return (
      <div className="widget">
        {img}
        <div>
          <a className="link" href={newsToDisplay['url']}>{newsToDisplay['title']}</a>

          <div className="from">From: {newsToDisplay.source ? newsToDisplay.source.name : '?'}</div>
        </div>
      </div>
    );
  }
}

export default GNewsWidget;