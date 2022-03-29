import React, { useRef, useState } from 'react';
import { Button, FormControl, Modal, Stack } from 'react-bootstrap';
import { useBrowserInfo } from '../../utils/useBowser';
import ClickableTag from '../atoms/ClickableTag';
import SubmitButton from '../atoms/SubmitButton';
import { useAllTags } from '../providers/AllTagsProvider';
import { useI18n } from '../providers/I18nProvider';

type Props = {
    show: boolean;
    setShow: (show: boolean) => void;
    tags: string[] | undefined;
    updateTags: (tags: string[]) => Promise<void>;
};

const TagsEditor: React.FC<Props> = ({ show, setShow, tags: givenTags, updateTags }: Props) => {
    const [tags, setTags] = useState<string[]>(givenTags ?? []);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const tagBoxRef = useRef<HTMLInputElement>(null);
    const { t } = useI18n();
    const { sortedTags } = useAllTags();
    const browserInfo = useBrowserInfo();
    const isMacOS = browserInfo.os.name === 'macOS';
    const isSafari = browserInfo.browser.name === 'Safari';
    const onHide = () => {
        setShow(false);
    };
    const add = (): void => {
        if (!tagBoxRef.current) {
            return;
        }
        const tag = tagBoxRef.current.value.trim() ?? '';
        if (tag.length === 0) {
            return;
        }
        const newTags = tag.split(/\s/).filter((newTag) => {
            return !tags.includes(newTag);
        });
        if (newTags.length === 0) {
            tagBoxRef.current.value = '';
            return;
        }
        const updatedTags = [...tags, ...newTags];
        setTags(updatedTags);
        tagBoxRef.current.value = '';
    };
    const onTagBoxKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // cannot avoid using deprecated `e.keyCode` due to https://qiita.com/ledsun/items/31e43a97413dd3c8e38e
        if (e.keyCode === 13) {
            if ((isMacOS && e.metaKey) || (!isMacOS && e.ctrlKey)) {
                onSubmit();
            } else if (!isSafari) {
                // Disabled for Safari because there is no way to distinguish it with selecting an item in the datalist
                add();
            }
            return;
        }
    };
    const removeTag = (tagToRemove: string) => {
        const updatedTags = tags.filter((tag) => tagToRemove !== tag);
        setTags(updatedTags);
    };
    const onSubmit = () => {
        setSubmitting(true);
        updateTags(tags).then(() => {
            setSubmitting(false);
            onHide();
        });
    };
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            onShow={() => {
                tagBoxRef.current?.focus();
            }}
        >
            <Modal.Header closeButton>{t('Edit tags')}</Modal.Header>
            <Modal.Body>
                <Stack direction="horizontal">
                    <FormControl list="all-tags" ref={tagBoxRef} onKeyDown={onTagBoxKeyDown} />
                    <datalist id="all-tags">
                        {sortedTags
                            .filter((tag) => {
                                return !tags.includes(tag);
                            })
                            .map((tag) => {
                                return <option value={tag} key={`tag-opt-${tag}`} />;
                            })}
                    </datalist>
                    <Button variant="primary" className="ms-2 text-nowrap" onClick={add}>
                        {t('Add')}
                    </Button>
                </Stack>
                <div className="text-muted small">{t('{{shortcut}} to save', { shortcut: `${isMacOS ? 'Cmd' : 'Ctrl'}+Enter` })}</div>
                <Stack direction="horizontal" className="flex-wrap">
                    {tags &&
                        tags.map((tag) => {
                            return <ClickableTag tag={tag} onClick={removeTag} key={`tag-${tag}`} />;
                        })}
                </Stack>
                {tags && tags.length > 0 && <div className="text-muted small">{t('Click to remove')}</div>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    {t('Cancel')}
                </Button>
                <SubmitButton submitting={submitting} onClick={onSubmit}>
                    {t('Save tags')}
                </SubmitButton>
            </Modal.Footer>
        </Modal>
    );
};

export default TagsEditor;
