import React from 'react';
import { FullWidthCol, Row } from '../common/layouts';
import StaticTag from '../common/StaticTag';
import { useAllTags } from '../providers/AllTagsProvider';
import { useI18n } from '../providers/I18nProvider';

const AllTags: React.FC = () => {
    const { allTags, sortedTags } = useAllTags();
    const { t } = useI18n();
    return (
        <Row>
            <FullWidthCol>
                <h1>{t('All tags')}</h1>
                {sortedTags.length === 0 && t('No tags are defined.')}
                {sortedTags.map((tag) => {
                    return <StaticTag tag={tag} count={allTags[tag]} key={`tag-${tag}`} />;
                })}
            </FullWidthCol>
        </Row>
    );
};

export default AllTags;
