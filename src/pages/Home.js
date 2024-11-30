import React from "react";
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import "../style/Home.css";

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
            <SearchBar />
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="popular-books">
          <h2>Popular Books</h2>
          <div className="book-grid">
            <div className="book-card">
              <Link to="/book/673793b98303ad48dd506228">
                <img src="catcher-in-the-rye.jpeg" alt="The Catcher in the Rye" />
              </Link>
            </div>
            <div className="book-card">
              <Link to="/book/673793298303ad48dd506219">
                <img src="to-kill-a-mockingbird.jpeg" alt="To Kill a Mockingbird" />
              </Link>
            </div>
            <div className="book-card">
              <Link to="/book/673793988303ad48dd506222">
                <img src="1984.jpeg" alt="1984" />
              </Link>
            </div>
            <div className="book-card">
              <Link to="/book/673793a98303ad48dd506225">
                <img src="great-gatsby.jpeg" alt="The Great Gatsby" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
