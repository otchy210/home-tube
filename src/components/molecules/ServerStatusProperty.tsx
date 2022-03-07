import { FFmpegWoekerStatus } from '@otchy/home-tube-api/dist/types';
import React from 'react';
import styled from 'styled-components';
import { useI18n } from '../providers/I18nProvider';

const PropertyTitle = styled.p.attrs({ className: 'h5 mt-3' })``;

type Props = {
    title: string;
    status: FFmpegWoekerStatus;
};

const ServerStatusProperty: React.FC<Props> = ({ title, status }) => {
    const { t } = useI18n();
    return (
        <>
            <PropertyTitle>{title}</PropertyTitle>
            <p>
                <div>{status.count > 0 ? t('{{count}} movies queued.', { count: status.count }) : t('No movies queued.')}</div>
                <small className="d-block text-muted">{status.current && `${t('Processing')}: "${status.current}"`}</small>
            </p>
        </>
    );
};

export default ServerStatusProperty;
