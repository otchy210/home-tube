import React, { useRef, useState } from 'react';
import { Button, FormControl, Modal, Stack } from 'react-bootstrap';
import SelectableTag from '../atoms/SelectableTag';
import Trashcan from '../../images/trashcan.svg';
import { useAllTags } from '../providers/AllTagsProvider';
import { useBrowserInfo } from '../../utils/useBowser';
import { useI18n } from '../providers/I18nProvider';

type TrashcanIconProps = {
    enabled: boolean;
    onClick: React.MouseEventHandler<HTMLElement>;
};
const TrashcanIcon: React.FC<TrashcanIconProps> = ({ enabled, onClick }: TrashcanIconProps) => {
    return (
        <Trashcan
            width={32}
            height={32}
            className="ms-2"
            style={{ cursor: enabled ? 'pointer' : 'default', opacity: enabled ? '1' : '0.4' }}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                if (enabled) {
                    onClick(e);
                }
            }}
        />
    );
};

type Props = {
    show: boolean;
    setShow: (show: boolean) => void;
    tags: string[] | undefined;
    updateTags: (tags: string[]) => void;
};

const TagsEditor: React.FC<Props> = ({ show, setShow, tags: givenTags, updateTags }: Props) => {
    const [tags, setTags] = useState<string[]>(givenTags ?? []);
    const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
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
    const onChangeSelected = (tag: string) => {
        const updatedSelectedTags = new Set(selectedTags);
        if (selectedTags.has(tag)) {
            updatedSelectedTags.delete(tag);
        } else {
            updatedSelectedTags.add(tag);
        }
        setSelectedTags(updatedSelectedTags);
    };
    const removeSelectedTags = () => {
        const updatedTags = tags.filter((tag) => {
            return !selectedTags.has(tag);
        });
        setTags(updatedTags);
        setSelectedTags(new Set());
    };
    const onSubmit = () => {
        updateTags(tags);
        onHide();
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
                    <TrashcanIcon enabled={selectedTags.size > 0} onClick={removeSelectedTags} />
                </Stack>
                <div className="text-muted small">{t('{{shortcut}} to save', { shortcut: `${isMacOS ? 'Cmd' : 'Ctrl'}+Enter` })}</div>
                <Stack direction="horizontal" className="flex-wrap">
                    {tags &&
                        tags.map((tag) => {
                            return (
                                <SelectableTag
                                    name={tag}
                                    checked={selectedTags.has(tag)}
                                    onChange={() => {
                                        onChangeSelected(tag);
                                    }}
                                    key={`tag-${tag}`}
                                />
                            );
                        })}
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    {t('Cancel')}
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    {t('Save tags')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TagsEditor;
