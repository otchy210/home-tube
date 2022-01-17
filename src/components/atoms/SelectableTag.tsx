import React from 'react';
import { Badge } from 'react-bootstrap';

type Props = {
    name: string;
};

const SelectableTag: React.FC<Props> = ({ name }: Props) => {
    return (
        <Badge bg="success" className="me-1 mt-2 fs-6">
            {name}
        </Badge>
    );
};

export default SelectableTag;
