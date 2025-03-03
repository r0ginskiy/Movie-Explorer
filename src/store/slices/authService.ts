import { base_url } from "../../utils/constants";
import { Filters, UserAccount, UserLogin } from "../../utils/types";

const authService = {
  async login(credentials: UserLogin) {
    try {
      const response: Response = await fetch(`${base_url}/users/login`, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        return { data };
      } else {
        throw new Error(response.status.toString());
      }
    } catch (error: string | any) {
      throw { message: error.message };
    }
  },
  async getUserById(email: string) {
    try {
      const response = await fetch(`${base_url}/users/${email}`, {
        method: "get",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        return { data };
      } else {
        throw new Error(response.status.toString());
      }
    } catch (error: string | any) {
      throw { message: error.message };
    }
  },
  async signUp(credentials: UserAccount) {
    try {
      const response = await fetch(`${base_url}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        return { data };
      } else {
        throw new Error(response.status.toString());
      }
    } catch (error: string | any) {
      throw { message: error.message };
    }
  },
  async getAllMetadata(token: string | null) {
    try {
      const response = await fetch(`${base_url}/movies/metadata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Error fetching movies: ${response.status}`);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async getFilteredFilmes(token: string | null, filters?: Filters) {
    try {
      let url = `${base_url}/movies/popular`;

      if (filters) {
        const queryParts = [];

        if (filters.year) queryParts.push(`year=${filters.year}`);
        if (filters.genres) queryParts.push(`genres=${filters.genres}`);
        if (filters.language) queryParts.push(`language=${filters.language}`);
        if (filters.actor) queryParts.push(`actor=${filters.actor}`);
        if (filters.title)
          queryParts.push(`title=${encodeURIComponent(filters.title)}`);
        if (filters.amount) queryParts.push(`amount=${filters.amount}`);
        if (filters.page) queryParts.push(`page=${filters.page}`);

        if (queryParts.length) {
          url += `?${queryParts.join("&")}`;
        }
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Error fetching movies: ${response.status}`);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

export default authService;
