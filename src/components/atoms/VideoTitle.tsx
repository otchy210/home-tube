import React from 'react';

type Props = {
    name: string;
};

const VideoTitle: React.FC<Props> = ({ name }: Props) => {
    return <div className="fs-4">{name}</div>;
};

export default VideoTitle;
