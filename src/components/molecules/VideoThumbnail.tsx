import { THUMBNAIL } from '@otchy/home-tube-api/dist/const';
import { VideoDetails } from '@otchy/home-tube-api/dist/types';
import { formatTimeInSecond } from '@otchy/home-tube-api/dist/utils/TimeUtils';
import React from 'react';
import { Stack } from 'react-bootstrap';
import styled from 'styled-components';
import { getThumbnailStyle } from '../../utils/ImageUtils';
import { useApi } from '../providers/ApiProvider';

const Outer = styled.div.attrs({ className: 'p-2 rounded' })`
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    bottom: 1rem;
`;

const Image = styled.div``;

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
    const maxSize = THUMBNAIL.SIZE / 2;
    const imageStyle = getThumbnailStyle({
        src,
        sec,
        width: details.width ?? 0,
        height: details.height ?? 0,
        maxWidth: maxSize,
        maxHeight: maxSize,
    });
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
