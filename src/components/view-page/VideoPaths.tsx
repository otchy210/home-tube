import React from 'react';

type Props = {
    names: string[];
};

const VideoPaths: React.FC<Props> = ({ names }: Props) => {
    const paths = [...names.slice(0, names.length - 1), ''];
    return <div className="fs-6 mt-2 mb-0 me-auto text-muted">{paths.join(' / ')}</div>;
};

export default VideoPaths;
