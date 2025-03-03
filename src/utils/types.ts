export interface Movie {
  _id: string;
  title: string;
  plot?: string;
  fullplot?: string;
  genres?: string[];
  runtime?: number;
  cast?: string[];
  poster?: string;
  languages?: string[];
  released?: string;
  directors?: string[];
  rated?: string;
  awards?: {
    wins?: number;
    nominations?: number;
    text?: string;
  };
  lastupdated?: string;
  year?: number;
  imdb?: {
    rating?: number;
    votes?: number;
    id?: number;
  };
  countries?: string[];
  type?: string;
  tomatoes: {
    viewer?: {
      rating?: number;
      numReviews?: number;
      meter?: number;
      fresh?: number;
    };
    critic?: {
      rating?: number;
      numReviews?: number;
      meter?: number;
      rotten?: number;
      lastUpdated?: string;
    };
  };
  num_mflix_comments?: number;
  rating?: number;
  votes?: number;
}

export interface AllMovies {
  movies: Movie[];
  pagination: Pagination;
}

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  hasPrevPage: boolean;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthState {
  status: string;
  userAccount: UserAccount | null;
  movies: AllMovies | null;
  metadata: MovieMetadata | null;
  token: string | null;
  paginationRequestPage: IPagination;
  error: string | null;
}


export interface IPagination {
  page: number;
}

export interface UserAccount {
  _id: string | null;
  name: string;
  role: string;
  password: string;
  expiration: number;
  blocked: boolean;
}

export interface MovieMetadata {
  success: boolean;
  data: MovieFilters;
}

export interface MovieFilters {
  languages: string[];
  actors: string[];
  genres: string[];
  years: number[];
}


export interface Filters {
  year?: number;
  genres?: string;
  language?: string;
  actor?: string;
  title?: string;
  amount?: number;
  page?: number;
}
