import React from 'react';
import { useSetTitle } from '../../hooks/useSetTitle';
import { useI18n } from '../providers/I18nProvider';

const NotFoundPage: React.FC = () => {
    const { t } = useI18n();
    useSetTitle(t('Page not found.'));
    return <div className="mt-4">{t('Page not found.')}</div>;
};

export default NotFoundPage;
