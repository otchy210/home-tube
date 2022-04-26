import React, { useRef, useState } from 'react';
import { useBrowserInfo } from '../../utils/useBowser';
import ClickableTag from '../atoms/ClickableTag';
import { PrimaryButton, SecondaryButton, SubmitButton } from '../common/buttons';
import { FormTextInput } from '../common/form';
import { HorizontalStack } from '../common/layouts';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../common/modal';
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
    const tagBoxRef = useRef<HTMLInputElement>(null!);
    const { t } = useI18n();
    const { sortedTags } = useAllTags();
    const browserInfo = useBrowserInfo();
    const isMacOS = browserInfo.os.name === 'macOS';
    const isSafari = browserInfo.browser.name === 'Safari';
    const onHide = () => {
        setShow(false);
    };
    const add = (): void => {
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
                tagBoxRef.current.focus();
            }}
        >
            <ModalHeader closeButton>{t('Edit tags')}</ModalHeader>
            <ModalBody>
                <HorizontalStack>
                    <FormTextInput list="all-tags" ref={tagBoxRef} onKeyDown={onTagBoxKeyDown} />
                    <datalist id="all-tags">
                        {sortedTags
                            .filter((tag) => {
                                return !tags.includes(tag);
                            })
                            .map((tag) => {
                                return <option value={tag} key={`tag-opt-${tag}`} />;
                            })}
                    </datalist>
                    <PrimaryButton className="ms-2" onClick={add}>
                        {t('Add')}
                    </PrimaryButton>
                </HorizontalStack>
                <div className="text-muted small">{t('{{shortcut}} to save', { shortcut: `${isMacOS ? 'Cmd' : 'Ctrl'}+Enter` })}</div>
                <HorizontalStack className="flex-wrap">
                    {tags &&
                        tags.map((tag) => {
                            return <ClickableTag tag={tag} onClick={removeTag} key={`tag-${tag}`} />;
                        })}
                </HorizontalStack>
                {tags && tags.length > 0 && <div className="text-muted small">{t('Click to remove')}</div>}
            </ModalBody>
            <ModalFooter>
                <SecondaryButton onClick={onHide}>{t('Cancel')}</SecondaryButton>
                <SubmitButton submitting={submitting} onClick={onSubmit}>
                    {t('Save tags')}
                </SubmitButton>
            </ModalFooter>
        </Modal>
    );
};

export default TagsEditor;
