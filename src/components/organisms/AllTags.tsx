import React from 'react';
import { Col, Row } from 'react-bootstrap';
import StaticTag from '../atoms/StaticTag';
import { useAllTags } from '../providers/AllTagsProvider';
import { useI18n } from '../providers/I18nProvider';

const AllTags: React.FC = () => {
    const { allTags, sortedTags } = useAllTags();
    const { translationReady, t } = useI18n();
    if (!translationReady) {
        return null;
    }
    return (
        <Row>
            <Col xs={12}>
                <h1>{t('All tags')}</h1>
                {sortedTags.length === 0 && t('No tags are defined.')}
                {sortedTags.map((tag) => {
                    return <StaticTag tag={tag} count={allTags[tag]} key={`tag-${tag}`} />;
                })}
            </Col>
        </Row>
    );
};

export default AllTags;
