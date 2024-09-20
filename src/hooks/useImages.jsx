import { useQueries } from '@tanstack/react-query';
import { fetchImages } from '../api';

export const useImages = (query) => {
    return useQuery(
        ['unsplashImage', query],
        () => fetchImages(query),
        {
            enabled: !!query, // Fetch only if query is not empty
            staleTime: Infinity, // Cache indefinitely
        }
    );
};
