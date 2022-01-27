import { THUMBNAIL } from '@otchy/home-tube-api/dist/const';
import { VideoDetails } from '@otchy/home-tube-api/dist/types';
import { formatTimeInSecond } from '@otchy/home-tube-api/dist/utils/TimeUtils';
import React from 'react';
import { Stack } from 'react-bootstrap';
import styled from 'styled-components';
import { useApi } from '../providers/ApiProvider';

const Outer = styled.div.attrs({ className: 'p-2 rounded' })`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    bottom: 1rem;
`;

const Image = styled.div``;

const getImageSize = (details: VideoDetails) => {
    if (!details.width || !details.height) {
        return [0, 0];
    } else if (details.width >= details.height) {
        return [THUMBNAIL.SIZE, details.height * (THUMBNAIL.SIZE / details.width)];
    } else {
        return [details.width * (THUMBNAIL.SIZE / details.height), THUMBNAIL.SIZE];
    }
};

type Props = {
    details: VideoDetails;
    currentTime: number;
    display: string;
    left: number;
};

const VideoThumbnail = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { details, currentTime, display, left } = props;
    const { key: videoKey } = details;
    const api = useApi();
    const sec = Math.trunc(currentTime) % 60;
    const min = (Math.trunc(currentTime) - sec) / 60;
    const src = api.getThumbnailsUrl(videoKey, String(min));
    const [width, height] = getImageSize(details);
    const imageStyle: React.CSSProperties = {
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: '#000',
        backgroundImage: `url(${src})`,
        backgroundPositionX: `${sec * width}px`,
        zoom: '.5',
    };
    return (
        <>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
            <Outer ref={ref as any} style={{ display, left: `${left}px` }}>
                <Stack>
                    <Image style={imageStyle} />
                    <div className="text-center text-white">{formatTimeInSecond(currentTime)}</div>
                </Stack>
            </Outer>
        </>
    );
});

export default VideoThumbnail;
