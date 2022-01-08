import { VideoDetails } from '@otchy/home-tube-api/dist/types';
import React, { useState } from 'react';
import { Badge, Col, Form, Image, Row, Stack } from 'react-bootstrap';
import StarsIndicator from '../molecules/StarsIndicator';

type Mode = 'default' | 'theater' | 'fullScreen';

const ViewPage: React.FC = () => {
    const [mode, setMode] = useState<Mode>('default');
    const video = {
        name: 'test-video.mp4',
        names: ['path', 'to', 'test-movie.mp4'],
        duration: '1:23:45',
        length: 60 * 60 + 60 * 23 + 45,
        vcodec: 'h.246',
        width: 1600,
        height: 900,
        acodec: 'acc',
        size: 'fhd',
        stars: 4,
        tags: ['tag1', 'tag2', 'tag3'],
    } as VideoDetails;
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
                        <Badge bg="secondary">
                            {width}x{height}
                        </Badge>
                        <Badge bg="secondary" className="ms-1">
                            {size?.toUpperCase()}
                        </Badge>
                    </div>
                </Stack>
                <p className="fs-4 my-0">{name}</p>
                <p>
                    <StarsIndicator stars={stars} onClick={(star) => console.log(`star: ${star} is clicked`)} />
                    <span className="fs-5">
                        {tags?.map((tag) => {
                            return <Badge className="ms-1">{tag}</Badge>;
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
