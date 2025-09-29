import { useState } from "react";
import articles from "../../data/articles";
import "./styles.css";

const Home = () => {
  const [query, setQuery] = useState("");

  // search filter function
  const filteredArticles = articles.filter((article) => {
    const searchText = query.toLowerCase();
    return (
      article.title.toLowerCase().includes(searchText) ||
      article.date.toLowerCase().includes(searchText) ||
      article.content.toLowerCase().includes(searchText)
    );
  });

  // got the highlight function from:https://stackoverflow.com/questions/29652862/highlight-text-using-reactjs
  // It searches for the text in the string and replaces it with highlighted version
  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text
      .split(regex)
      .map((part, index) => (regex.test(part) ? <mark key={index}>{part}</mark> : part));
  };

  return (
    <div className="flex">
      <h1>Search Articles</h1>

      <input
        type="text"
        placeholder="Search articles.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search"
      />

      {filteredArticles.length === 0 ? (
        <p>No article found</p>
      ) : (
        filteredArticles.map((article, index) => (
          <div key={index} className="article flex">
            <h2>{highlightText(article.title, query)}</h2>
            <p>{highlightText(article.date, query)}</p>
            <p>{highlightText(article.content, query)}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
