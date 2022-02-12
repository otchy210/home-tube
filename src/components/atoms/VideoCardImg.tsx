import { VideoValues } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import { Badge } from 'react-bootstrap';
import { useApi } from '../providers/ApiProvider';
import styled from 'styled-components';
import Spinner from './Spinner';

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

const SpinnerWrapper = styled.div`
    position: absolute;
    display: inline-block;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
`;

type Props = {
    video: VideoValues;
    loading: boolean;
    opacity: number;
};

const VideoCardImg: React.FC<Props> = ({ video, loading, opacity }: Props) => {
    const { key, duration, size } = video;
    const api = useApi();
    return (
        <VideoCardImgWrapper className="card-img-top">
            <img src={api.getSnapshotUrl(key)} style={{ opacity }} />
            <BadgeHolder>
                {duration && <SmallBadge>{duration}</SmallBadge>}
                {size && <SmallBadge>{size}</SmallBadge>}
            </BadgeHolder>
            {loading && (
                <SpinnerWrapper>
                    <Spinner />
                </SpinnerWrapper>
            )}
        </VideoCardImgWrapper>
    );
};

export default VideoCardImg;
