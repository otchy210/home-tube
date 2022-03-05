import React from 'react';
import { useI18n } from '../providers/I18nProvider';

const NotFoundPage: React.FC = () => {
    const { t } = useI18n();
    return <div>{t('Page not found.')}</div>;
};

export default NotFoundPage;
