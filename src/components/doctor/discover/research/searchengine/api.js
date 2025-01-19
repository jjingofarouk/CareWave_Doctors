const BASE_URL = 'https://api.example.com/v1';

class SearchAPI {
  constructor() {
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  async search({ query, filters, sort, type, page, limit }) {
    try {
      const response = await fetch(`${BASE_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.token && { Authorization: `Bearer ${this.token}` })
        },
        body: JSON.stringify({
          query,
          filters,
          sort,
          type,
          page,
          limit
        })
      });

      if (!response.ok) {
        throw new Error('Search request failed');
      }

      const data = await response.json();
      return {
        data: data.results,
        hasMore: data.hasMore,
        total: data.total
      };
    } catch (error) {
      console.error('Search error:', error);
      throw new Error('Failed to perform search');
    }
  }

  async export({ results, format, query, filters, sort, type }) {
    try {
      const response = await fetch(`${BASE_URL}/export`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.token && { Authorization: `Bearer ${this.token}` })
        },
        body: JSON.stringify({
          results,
          format,
          query,
          filters,
          sort,
          type
        })
      });

      if (!response.ok) {
        throw new Error('Export request failed');
      }

      return await response.blob();
    } catch (error) {
      console.error('Export error:', error);
      throw new Error('Failed to export results');
    }
  }
}

export const searchAPI = new SearchAPI();