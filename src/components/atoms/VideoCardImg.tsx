import { VideoDocument } from '@otchy/home-tube-api/dist/types';
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

const SizeBadge = styled(Badge).attrs({ className: 'm-1 bg-secondary text-uppercase' })`
    position: absolute;
    right: 0;
    bottom: 0;
    opacity: 0.8;
`;

type Props = {
    video: VideoDocument;
};

const VideoCardImg: React.FC<Props> = ({ video }: Props) => {
    const { id, values } = video;
    const api = useApi();
    return (
        <VideoCardImgWrapper className="card-img-top">
            <img src={api.getSnapshotUrl(String(id))} />
            {values.size && <SizeBadge>{values.size}</SizeBadge>}
        </VideoCardImgWrapper>
    );
};

export default VideoCardImg;
