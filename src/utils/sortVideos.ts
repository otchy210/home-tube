import { VideoDocument } from '@otchy/home-tube-api/dist/types';

export const getSortedVideos = (videoSet: Set<VideoDocument>): VideoDocument[] => {
    const videos = [...videoSet];
    videos.sort((left, right) => {
        const leftName = left.values.name;
        const rightName = right.values.name;
        const nameDiff = leftName.localeCompare(rightName);
        if (nameDiff !== 0) {
            return nameDiff;
        }
        return left.id - right.id;
    });
    return videos;
};
