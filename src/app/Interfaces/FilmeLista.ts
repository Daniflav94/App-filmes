export interface FilmeLista {
    original_title: string;
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    overview: string;
    id: number;
    idBanco?: any;
    voto?: number;
    isFavorite?: boolean;  
    isSave?: boolean; 
    assistido?: boolean;
    genre_ids?: Number[]
}