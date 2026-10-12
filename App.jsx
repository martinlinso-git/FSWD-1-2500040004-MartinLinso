
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/books')
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => setBooks(data))
      .catch(() => setError('Unable to load books. Start JSON Server.'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="library">
      <nav className="navbar">
        <div className="brand">📚 Digital <span>Library</span></div>
        <p>Better Books · Better Minds · A Brighter Future</p>
      </nav>

      <header className="hero">
        <div className="hero-note">Good Books<br />Build Great<br />Ideas ♡</div>
        <div className="hero-content">
          <h1><span>Digital Library</span></h1>
          <p></p>
          <div className="search-box">
            <span>⌕</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title or author..."
            />
            {search && (
              <button onClick={() => setSearch('')}>✕</button>
            )}
          </div>
          <div className="book-count">
            {filtered.length} books available
          </div>
        </div>
        <div className="hero-books">📚 🌿</div>
      </header>

      <main className="main-content">
        {loading ? (
          <p className="message">Loading your library...</p>
        ) : error ? (
          <p className="message error">{error}</p>
        ) : filtered.length ? (
          <div className="book-grid">
            {filtered.map((book, index) => (
              <article className="book-card" key={book.id}>
                <div className={`book-cover cover-${index % 6}`}>
                  <span className="cover-icon">✦</span>
                  <h2>{book.title}</h2>
                  <div className="cover-line"></div>
                  <p>{book.author}</p>
                </div>
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                  <span className="book-id">ID: {book.id}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="message">No books found. Try another search.</p>
        )}
      </main>

      <footer>
        <span>📖</span> Read More <b>•</b> Know More <b>•</b> Be More
      </footer>
    </div>
  );
}

export default App;
