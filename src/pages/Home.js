import React from "react";
import "../style/Home.css"; // Assuming you have CSS for styling

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">
          <img
            src="litarchivefb.jpg"
            alt="ABC Library Logo"
            className="logo-image"
          />
        </div>
        <div className="header-banner">
          <div className="banner-content">
            <p className="subheading">Reading is the best to get idea</p>
            <h1 className="main-heading">Keep Reading</h1>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for a book..."
                className="search-input"
              />
              <button className="search-button">FIND BOOK</button>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="popular-books">
          <h2>Popular Books</h2>
          <div className="book-grid">
            <div className="book-card">
            <img src="catcher-in-the-rye.jpeg" alt="The Catcher in the Rye" />
            </div>
            <div className="book-card">
              <img src="to-kill-a-mockingbird.jpeg" alt="To Kill a Mockingbird" />
            </div>
            <div className="book-card">
              <img src="1984.jpeg" alt="1984" />
            </div>
            <div className="book-card">
              <img src="great-gatsby.jpeg" alt="The Great Gatsby" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
