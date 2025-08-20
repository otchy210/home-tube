export type VideoViewMode = 'normal' | 'theater' | 'fullScreen';

export interface FolderData {
    path: string;
    name: string;
    folders: FolderData[];
}

export interface TreeNode {
    key: string;
    title: string;
    children?: TreeNode[];
}
