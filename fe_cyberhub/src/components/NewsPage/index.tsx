import React, { useEffect, useState } from 'react';
import { fetchNews } from '@api/newsApi';

const NewsPage: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        // const newsData = await fetchNews();
        // setNews(newsData);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  if (loading) {
    return <p>Loading news...</p>;
  }

  return (
    <div>
      <h2>Technology News</h2>
      {news.map((article, index) => (
        <div key={index}>
          <h3>{article.title}</h3>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsPage;
