# Movie Explorer

**Movie Explorer** is a web app designed for searching, filtering, and viewing movie details. Users can register, log in, browse paginated movie lists, filter by criteria (year, genre, actor, language), and explore detailed movie information. The app integrates with a custom Node.js backend using MongoDB and the `sample_mflix` collection.

## Installation and Setup

### Requirements
- **Node.js**: v16.x or higher
- **npm**: v8.x or higher
- **MongoDB**: Local or cloud database with the `sample_mflix` collection
- **Backend**: Custom Node.js server (assumed running at `http://16.171.138.153:3002`)

### Frontend Setup

1. **Clone the repository**:

    git clone https://github.com/your-username/movie-explorer.git
    cd movie-explorer


2. **Install dependencies**:

    npm install


3. **Set environment variables**:  
   Create a `.env` file in the root and add the following line:

    ```
    REACT_APP_BASE_URL=http://localhost:5000/api
    ```

4. **Run the app**:

    - Development mode:
    
      npm start


      The app will open at [http://localhost:3000](http://localhost:3000).
    
    - Production build:
    
      npm run build


### Backend Setup

1. **Set up MongoDB**:  
   Ensure MongoDB is running, and the `sample_mflix` collection is imported.

2. **Run the backend**:

    - Navigate to the backend directory.
    
    - Install dependencies:

      npm install


    - Start the server:

      nodemon index.js


      The backend is assumed to be running at `http://localhost:5000`.

## Design and Architecture

### Design Decisions

- **UI Framework**:
  - **Tailwind CSS**: Used for responsive, utility-based styling.
  - **Material-UI**: Applied for components like `AutocompleteFilter` and loaders.
  - **Lucide-react**: Provides icons for a consistent visual style.

- **Responsiveness**:
  - The app is fully responsive, adapting to both mobile and desktop views using Tailwind CSS classes.

- **UX Enhancements**:
  - Hover effects and smooth transitions enhance interactivity (e.g., Pagination buttons).

### Architecture

- **Frontend**:
  - **React**: Functional components with hooks.
  - **Redux Toolkit**: Manages state through the `userSlice` with async thunks.
  - **React Router**: Handles navigation between different pages (`/login`, `/film/:id`).

- **Data Structure**:
  - TypeScript interfaces (`Movie`, `AuthState`) ensure type safety and provide clear data models.

- **API Interaction**:
  - `authService` uses `fetch` for backend requests (e.g., `/movies/popular`).

- **State Persistence**:
  - Redux state is saved to `localStorage` to preserve user login sessions.

### Key Decisions

- **Pagination**:  
  Pagination state is persisted through React Router, ensuring the app remembers the current page.

- **Custom Node.js Backend**:  
  The backend is custom-built using Node.js and MongoDB, which provides flexibility and replaces public APIs with more controlled endpoints.

## Features

- **User Authentication**:  
  Users can register, log in, and maintain sessions using JWT.

- **Movie Search & Filters**:
  - Filter movies by year, genre, actor, and language.
  - Search movies by title.

- **Movie Details**:  
  View detailed information about each movie, including description, cast, and more.

- **Pagination**:  
  Browse movie lists with pagination, ensuring fast performance even with large datasets.



