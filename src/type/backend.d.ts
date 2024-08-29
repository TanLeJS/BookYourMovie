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

  interface IMovie {
    _id: string;
    adult: boolean;
    status: string;
    title: string;
    genres: string;
    backdrop_path: string;
    genre_ids: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    trailer: string;
    duration: number;
    director: string;
    actors: string;
    vote_average: number;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
  }

  interface ITheater {
    _id: string;
    name: string;
    location: string;
    zip_code: number;
    totalSeats: number;
  }

  interface IScreen {
    name: string;
    totalSeats: number;
    theater: ITheater;
  }

  interface ISchedule {
    _id: string;
    movie: IMovie;
    screen: IScreen;
    date: Date;
    time: string;
    format: string;
    seats: {
      label: string;
      status: string;
    }[];
    ticketPrices: {
      Adult: number;
      Senior: number;
      Child: number;
    };
  }

  interface IFormat {
    format: string; // The format type (e.g., standard, 3D, IMAX)
    schedules: ISchedule[]; // Array of schedules for this format
  }

  interface IScheduleResponse {
    theater: ITheater;
    formats: IFormat[]; // Array of formats, each containing its schedules
  }

  interface ISeat {
    _id: string;
    label: string;
    status: string;
  }
}
