export interface Provider {
    id: number;
    results: {
        BR: {
            flatrate: [{
                logo_path: string;
                provider_name: string;
            }],
            rent: [{
                logo_path: string;
                provider_name: string;
            }]
        }
    }
}
