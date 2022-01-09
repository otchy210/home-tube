import React, { ReactNode } from 'react';
import { Button, Form, Stack } from 'react-bootstrap';
import { useApi } from '../../utils/ApiContext';

const ConfigTitle: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <p className="h1 pt-3">{children}</p>;
};

const PropertyTitle: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <p className="h5 mt-3">{children}</p>;
};

const ConfigPage: React.FC = () => {
    const api = useApi();
    api.getAppConfig().then(console.log);
    return (
        <>
            <ConfigTitle>Config</ConfigTitle>
            <Form>
                <PropertyTitle>Video storage path</PropertyTitle>
                <Form.Text className="text-muted">Add your video storage path which has your videos.</Form.Text>
                <Stack direction="horizontal" gap={2}>
                    <Form.Control type="text" />
                    <Form.Check type="checkbox" label="enabled" />
                    <Button variant="danger">Delete</Button>
                </Stack>
                <Stack direction="horizontal" gap={2} className="mt-1">
                    <Form.Control type="text" />
                    <Form.Check type="checkbox" label="enabled" />
                    <Button variant="danger">Delete</Button>
                </Stack>
                <Stack direction="horizontal" gap={2} className="mt-1">
                    <Button variant="secondary" type="submit">
                        Add video storage path
                    </Button>
                </Stack>

                <PropertyTitle>ffmpeg path</PropertyTitle>
                <Form.Text className="text-muted">No need to set unless you want to change it from default.</Form.Text>
                <Form.Control type="text" />

                <Stack direction="horizontal" gap={2} className="mt-3">
                    <Button variant="primary" type="submit">
                        Save config
                    </Button>
                    <Button variant="link">Cancel</Button>
                </Stack>
            </Form>
        </>
    );
};

export default ConfigPage;
