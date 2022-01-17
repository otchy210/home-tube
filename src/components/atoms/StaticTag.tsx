import React from 'react';
import { Badge } from 'react-bootstrap';

type Props = {
    name: string;
};

const Tag: React.FC<Props> = ({ name }: Props) => {
    return (
        <Badge bg="success" className="ms-1 fs-6">
            {name}
        </Badge>
    );
};

export default Tag;
