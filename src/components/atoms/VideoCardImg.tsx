import { VideoDocument } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { Badge, Stack } from 'react-bootstrap';
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
    video: VideoDocument;
};

const VideoCardImg: React.FC<Props> = ({ video }: Props) => {
    const { id, values } = video;
    const api = useApi();
    return (
        <VideoCardImgWrapper className="card-img-top">
            <img src={api.getSnapshotUrl(String(id))} />
            <BadgeHolder>
                {values.duration && <SmallBadge>{values.duration}</SmallBadge>}
                {values.size && <SmallBadge>{values.size}</SmallBadge>}
            </BadgeHolder>
        </VideoCardImgWrapper>
    );
};

export default VideoCardImg;
