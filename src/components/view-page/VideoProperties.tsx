import { Stars, VideoDetails } from '@otchy/home-tube-api/dist/types';
import React, { useState } from 'react';
import { Col, Container, HorizontalStack, Row } from '../common/layouts';
import { EditableStars } from '../common/Stars';
import StaticTag from '../common/StaticTag';
import { useAllTags } from '../providers/AllTagsProvider';
import { useI18n } from '../providers/I18nProvider';
import TagsEditor from './TagsEditor';
import { EditIcon } from './ViewPageIcons';

type Props = {
    details: VideoDetails;
    saveStars: (stars: Stars) => void;
    removeStars: () => void;
    updateTags: (tags: string[]) => Promise<void>;
};

const VideoProperties: React.FC<Props> = ({ details, saveStars, removeStars, updateTags }: Props) => {
    const { stars, tags: givenTags } = details;
    const [showTagsEditor, setShowTagsEditor] = useState<boolean>(false);
    const { t } = useI18n();
    const { allTags } = useAllTags();
    const tags = givenTags
        ? givenTags.sort((left, right) => {
              const leftCount = allTags[left];
              const rightCount = allTags[right];
              if (leftCount !== rightCount) {
                  return rightCount - leftCount;
              }
              return left.localeCompare(right);
          })
        : [];
    return (
        <>
            <TagsEditor show={showTagsEditor} setShow={setShowTagsEditor} {...{ tags, updateTags }} />
            <Container className="p-0">
                <Row>
                    <Col width={[12, 12, 3]}>
                        <EditableStars stars={stars} saveStars={saveStars} removeStars={removeStars} />
                    </Col>
                    <Col width={[12, 12, 9]}>
                        <HorizontalStack>
                            <div className="text-nowrap" style={{ lineHeight: '32px' }}>
                                {t('Tags')}:
                            </div>
                            <div>
                                {tags.map((tag) => {
                                    return <StaticTag tag={tag} count={allTags[tag]} key={`tag-${tag}`} />;
                                })}
                                <EditIcon onClick={() => setShowTagsEditor(true)} />
                            </div>
                        </HorizontalStack>
                    </Col>
                </Row>
            </Container>
            <HorizontalStack></HorizontalStack>
        </>
    );
};

export default VideoProperties;
