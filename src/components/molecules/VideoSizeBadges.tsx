import React from 'react';
import { SecondaryBadge } from '../common/badges';

type Props = {
    width: number | undefined;
    height: number | undefined;
    size: string | undefined;
};

const VideoSizeBadges: React.FC<Props> = ({ width, height, size }: Props) => {
    return (
        <div className="text-nowrap">
            {width && height && (
                <SecondaryBadge>
                    {width}x{height}
                </SecondaryBadge>
            )}
            {size && <SecondaryBadge className="ms-1 text-uppercase">{size}</SecondaryBadge>}
        </div>
    );
};

export default VideoSizeBadges;
