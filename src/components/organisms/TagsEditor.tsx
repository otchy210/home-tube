import React, { useRef, useState } from 'react';
import { Button, FormControl, Modal, Stack } from 'react-bootstrap';
import SelectableTag from '../atoms/SelectableTag';
import Trashcan from '../../images/trashcan.svg';
import { useAllTags } from '../providers/AllTagsProvider';
import { useBrowserInfo } from '../../utils/useBowser';

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
    const inputRef = useRef<HTMLInputElement>(null);
    const { sortedTags } = useAllTags();
    const browserInfo = useBrowserInfo();
    const isMacOS = browserInfo.os.name === 'macOS';
    const onHide = () => {
        setShow(false);
    };
    const add = (): void => {
        if (!inputRef.current) {
            return;
        }
        const tag = inputRef.current.value.trim() ?? '';
        if (tag.length === 0 || tags.includes(tag)) {
            return;
        }
        const updatedTags = [...tags, tag];
        setTags(updatedTags);
        inputRef.current.value = '';
    };
    const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // cannot avoid using deprecated `e.keyCode` due to https://qiita.com/ledsun/items/31e43a97413dd3c8e38e
        if (e.keyCode === 13) {
            if ((isMacOS && e.metaKey) || (!isMacOS && e.ctrlKey)) {
                onSubmit();
            } else {
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
                inputRef.current?.focus();
            }}
        >
            <Modal.Header closeButton>Edit tags</Modal.Header>
            <Modal.Body>
                <Stack direction="horizontal">
                    <FormControl list="all-tags" ref={inputRef} onKeyDown={onInputKeyDown} />
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
                        Add
                    </Button>
                    <TrashcanIcon enabled={selectedTags.size > 0} onClick={removeSelectedTags} />
                </Stack>
                <div className="text-muted small">{isMacOS ? 'Cmd' : 'Ctrl'}+Enter to submit</div>
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
                    Close
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TagsEditor;
