export {};
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }

  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IModelPaginate<T> {
    meta: {
      current: number;
      pageSize: number;
      pages: number;
      total: number;
    };
    result: T[];
  }

  interface IMovieTop {
    _id: string;
    adult: boolean;
    status: string;
    title: string;
    genres: string[];
    backdrop_path: string;
    genre_ids: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    trailer: string;
    duration: number;
    director: string;
    actors: string[];
    vote_average: number;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
  }
}
