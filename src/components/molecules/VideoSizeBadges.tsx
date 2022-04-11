import React from 'react';
import { Badge } from 'react-bootstrap';

type Props = {
    width: number | undefined;
    height: number | undefined;
    size: string | undefined;
};

const VideoSizeBadges: React.FC<Props> = ({ width, height, size }: Props) => {
    return (
        <div className="text-nowrap">
            {width && height && (
                <Badge bg="secondary">
                    {width}x{height}
                </Badge>
            )}
            {size && (
                <Badge bg="secondary" className="ms-1 text-uppercase">
                    {size}
                </Badge>
            )}
        </div>
    );
};

export default VideoSizeBadges;
