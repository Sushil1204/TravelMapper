import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchItinerary } from '../api';

export const useGenerateItinerary = (params) => {
    return useMutation({
        mutationFn: () => fetchItinerary(params),
        retry: 2,  // Retry failed request up to 2 times
        onError: (error) => {
            console.error('Error generating itinerary:', error);
        },
        onSuccess: (data) => {
            console.log('Itinerary generated successfully:', data);
        }
    });
};
