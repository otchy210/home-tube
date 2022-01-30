import React from 'react';
import { Col, Row } from 'react-bootstrap';
import StaticTag from '../atoms/StaticTag';
import { useAllTags } from '../providers/AllTagsProvider';

const AllTags: React.FC = () => {
    const { allTags, sortedTags } = useAllTags();
    return (
        <Row>
            <Col xs={12}>
                <h1>All tags</h1>
                {sortedTags.length === 0 && 'No tags are defined'}
                {sortedTags.map((tag) => {
                    return <StaticTag tag={tag} count={allTags[tag]} key={`tag-${tag}`} />;
                })}
            </Col>
        </Row>
    );
};

export default AllTags;
