import { VideoDetails } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useState } from 'react';
import { Badge, Col, Form, Image, Row, Stack } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import StarsIndicator from '../molecules/StarsIndicator';
import { useApi } from '../providers/ApiProvider';
import { useToast } from '../providers/ToastsProvider';

type Mode = 'default' | 'theater' | 'fullScreen';

const ViewPage: React.FC = () => {
    const [mode, setMode] = useState<Mode>('default');
    const [video, setVideo] = useState<VideoDetails>();
    const [searchParams] = useSearchParams();
    const api = useApi();
    const toast = useToast();
    useEffect(() => {
        const id = searchParams.get('id');
        if (!id) {
            toast.addError('Video', 'id parameter is required.');
            return;
        }
        api.getVideo(id)
            .then(setVideo)
            .catch((e) => {
                console.error(e);
                toast.addError('Video', `No video found. id: ${id}`);
            });
    }, []);
    if (!video) {
        return null;
    }
    const { name, names, vcodec, width, height, acodec, size, stars, tags } = video;
    const visiblePaths = [...names.slice(0, names.length - 1), ''];
    return (
        <Row className="pt-4">
            <Col xs={12} lg={mode === 'default' ? 9 : 12}>
                <div>
                    <Image src="https://dummyimage.com/800x450/cccccc/ffffff.png&amp;text=movie" style={{ width: '100%' }} />
                </div>
                <Stack direction="horizontal">
                    <div className="fs-6 mt-2 mb-0 me-auto text-muted">{visiblePaths.join(' / ')}</div>
                    <div>
                        {width && height && (
                            <Badge bg="secondary">
                                {width}x{height}
                            </Badge>
                        )}
                        {size && (
                            <Badge bg="secondary" className="ms-1 text-uppercase">
                                {size}
                            </Badge>
                        )}
                    </div>
                </Stack>
                <p className="fs-4 my-0">{name}</p>
                <p>
                    <StarsIndicator size={30} stars={stars} onClick={(star) => console.log(`star: ${star} is clicked`)} />
                    <span className="fs-5">
                        {tags?.map((tag) => {
                            return (
                                <Badge className="ms-1" key={`tag-${tag}`}>
                                    {tag}
                                </Badge>
                            );
                        })}
                    </span>
                </p>
            </Col>
            <Col xs={12} lg={mode === 'default' ? 3 : 12}>
                <dl>
                    <dt>video codec</dt>
                    <dd>{vcodec}</dd>
                    <dt>audio codec</dt>
                    <dd>{acodec}</dd>
                </dl>
                <Form.Switch
                    label="theater"
                    onChange={(e) => {
                        setMode(e.target.checked ? 'theater' : 'default');
                    }}
                />
            </Col>
        </Row>
    );
};

export default ViewPage;
