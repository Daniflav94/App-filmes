export interface Filme {
    backdrop_path: string
    genres: [
        {
            name: string
        }
    ]
    id: number
    overview: string
    poster_path: string
    release_date: string
    runtime: number
    title: string
    vote_count: number
}