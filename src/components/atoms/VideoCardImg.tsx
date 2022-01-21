import { VideoValues } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { Badge } from 'react-bootstrap';
import { useApi } from '../providers/ApiProvider';
import styled from 'styled-components';

const VideoCardImgWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    background-color: #000;
`;

const BadgeHolder = styled.div.attrs({ className: 'hstack m-1' })`
    position: absolute;
    right: 0;
    bottom: 0;
    opacity: 0.8;
`;

const SmallBadge = styled(Badge).attrs({ className: 'ms-1 bg-secondary fw-normal text-uppercase' })``;

type Props = {
    video: VideoValues;
};

const VideoCardImg: React.FC<Props> = ({ video }: Props) => {
    const { key, duration, size } = video;
    const api = useApi();
    return (
        <VideoCardImgWrapper className="card-img-top">
            <img src={api.getSnapshotUrl(key)} />
            <BadgeHolder>
                {duration && <SmallBadge>{duration}</SmallBadge>}
                {size && <SmallBadge>{size}</SmallBadge>}
            </BadgeHolder>
        </VideoCardImgWrapper>
    );
};

export default VideoCardImg;
