export interface Filme {
    backdrop_path: string;
    genres: [
        {
            name: string
        }
    ];
    id: number;
    overview: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    title: string;
    vote_count: number;
    cast?: [
        {
          name: string,
          profile_path: string,
          character: string,
          known_for_department: string 
        }
    ];
    crew?: [
        {
            name: string,
            known_for_department: string,
            job: string
        }
    ]
}