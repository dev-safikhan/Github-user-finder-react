import  { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import "./Searchbar.css";

const Searchbar = () => {
  const [searchquery, setSearchquery] = useState("");
  const [userdata, setUserdata] = useState(null);
  const [notFound, setNotFound] = useState(false);

  let products = [
    "samsung",
    "I phone",
    "karbonn",
    "Macbook",
    "headphones",
    "neckband",
    "refridgerator",
  ];

  useEffect(() => {
    if (searchquery.trim().length < 3) {
      setUserdata(null);
      setNotFound(false);
      return;
    }

    // Debounce timer taaki har letter type hone par turant API hit na ho
    const timer = setTimeout(() => {
      fetch(`https://api.github.com/users/${searchquery.trim()}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("User not found or rate limited");
          }
          return res.json();
        })
        .then((data) => {
          setUserdata(data);
          setNotFound(false);
        })
        .catch((err) => {
          console.log(err.message);
          setUserdata(null);
          setNotFound(true);
        });
    }, 500); // 500ms ka delay

    // Cleanup function
    return () => clearTimeout(timer);
  }, [searchquery]);

  let filter_products = products.filter((product) =>
    product.toLowerCase().includes(searchquery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="searchbar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search GitHub user..."
          value={searchquery}
          onChange={(e) => setSearchquery(e.target.value)}
          className="search-input"
          required
        />
        <button type="submit" className="search-btn">Search</button>

        {searchquery && (
          <ul className="suggestions-list">
            {filter_products.map((item, index) => (
              <li key={index} className="suggestion-item">{item}</li>
            ))}
          </ul>
        )}
      </form>

      {userdata ? (
        <ProfileCard user={userdata} />
      ) : notFound ? (
        <p className="error-text">No GitHub user found!</p>
      ) : (
        searchquery.trim().length > 0 && searchquery.trim().length < 3 && (
          <p className="info-text">Type at least 3 characters to search...</p>
        )
      )}
    </div>
  );
};

export default Searchbar;