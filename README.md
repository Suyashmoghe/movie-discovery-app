# Movie Discovery App

A responsive movie discovery application built with React.js and the TMDB REST API. Users can search for movies, explore movies by genre, browse popular and top-rated movies, view detailed movie information, and maintain a persistent watchlist.

## Features

- Search movies by title using the TMDB API
- Browse movies by genre across 10+ genres
- Browse popular movies
- Browse top-rated movies
- Load more movies using API pagination
- View detailed information for individual movies
- Add movies to a personal watchlist
- Remove movies from the watchlist
- Persist watchlist data using localStorage
- Responsive movie grid using CSS Grid
- Loading, error, empty, and populated states
- Reusable React components
- Client-side routing with React Router

## Tech Stack

- React.js
- JavaScript (ES6+)
- React Hooks
- React Router
- REST API
- Fetch API
- HTML5
- CSS3
- CSS Grid
- localStorage
- Vite

## API

Movie data and images are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

This product uses the TMDB API but is not endorsed or certified by TMDB.

## Project Structure

```text
src/
├── components/
│   ├── GenreFilter.jsx
│   ├── MovieCard.jsx
│   ├── MovieGrid.jsx
│   ├── Navbar.jsx
│   └── SearchBar.jsx
│
├── pages/
│   ├── Credits.jsx
│   ├── Home.jsx
│   ├── MovieDetails.jsx
│   ├── TopRated.jsx
│   └── Watchlist.jsx
│
├── services/
│   └── movieApi.js
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Main Routes

| Route        | Purpose                    |
| ------------ | -------------------------- |
| `/`          | Discover and search movies |
| `/movie/:id` | View movie details         |
| `/watchlist` | View saved movies          |
| `/top-rated` | Browse top-rated movies    |
| `/credits`   | API attribution            |

## Local Setup

Clone the repository and install the dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Start the development server:

```bash
npm run dev
```

The application will run locally using the Vite development server.

## Note

The TMDB API key is required for the application to fetch movie data. The `.env` file is excluded from version control and should not be committed to the repository.
