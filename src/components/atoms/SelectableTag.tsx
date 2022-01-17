import React from 'react';
import styled from 'styled-components';
import CheckboxIcon from '../../images/checkbox.svg';

const Label = styled.label.attrs({ className: 'badge bg-success me-1 mt-2 fs-6 text-nowrap' })`
    cursor: pointer;
    display: flex;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
    display: none;
    & + svg > path:nth-child(2) {
        opacity: 0;
    }
    &:checked + svg > path:nth-child(2) {
        opacity: 1;
    }
`;

type Props = {
    name: string;
    checked: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const SelectableTag: React.FC<Props> = ({ name, checked, onChange }: Props) => {
    return (
        <Label>
            <Checkbox checked={checked} onChange={onChange} />
            <CheckboxIcon width={16} height={16} className="me-1" />
            <span>{name}</span>
        </Label>
    );
};

export default SelectableTag;
