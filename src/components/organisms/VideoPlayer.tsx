import { VideoDetails } from '@otchy/home-tube-api/dist/types';
import React, { useEffect, useRef, useState } from 'react';
import { Stack } from 'react-bootstrap';
import styled, { css } from 'styled-components';
import { VideoViewMode } from '../../types';
import { formatTimeInSecond } from '@otchy/home-tube-api/dist/utils/TimeUtils';
import VideoThumbnail from '../molecules/VideoThumbnail';
import { useApi } from '../providers/ApiProvider';
import {
    ForwardIcon,
    FullScreenIcon,
    MutedIcon,
    NormalIcon,
    PauseIcon,
    PauseIndicatorIcon,
    PlayIcon,
    PlayIndicatorIcon,
    RewindIcon,
    SnapshotIcon,
    SpeakerIcon,
    TheaterIcon,
} from '../atoms/VideoPlayerIcons';
import SnapshotPreview from './SnapshotPreview';
import { useI18n } from '../providers/I18nProvider';
import { useToast } from '../providers/ToastsProvider';

const VideoPlayerWrapper = styled.div`
    position: relative;
    width: 100%;
    height: inherit;
    &.hide-control {
        cursor: none;
        .video-control {
            opacity: 0;
            transition: opacity 0.2s;
        }
    }
    &.remove-control .video-control {
        display: none;
    }
`;

const VideoPlayIndicator = styled.div`
    display: none;
    position: absolute;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
    z-index: 1;
    transition: opacity 0.5s, transform 0.5s;
    &.animate {
        display: block;
        opacity: 0;
        transform: translate(-50%, -50%) scale(150%);
    }
`;

const VideoWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    overflow: hidden;
    aspect-ratio: 16 / 9;
    background-color: #000;
    width: 100%;
    height: inherit;
`;

const Video = styled.video.attrs({ crossOrigin: 'anonymous' })`
    max-width: 100%;
    height: inherit;
`;

const VideoControl = styled(Stack).attrs({ className: 'video-control' })`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 120px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
    opacity: 1;
    transition: opacity 0.2s;
`;

const barWrapperStyle = css`
    padding: 8px 0;
    cursor: pointer;
    transition: padding 0.2s;
    &:hover .handle,
    &.dragging .handle {
        width: 16px;
        height: 16px;
        transition: width 0.2s, height 0.2s;
    }
`;
const SeekbarWrapper = styled.div.attrs({ className: 'px-3' })`
    ${barWrapperStyle};
`;
const VolumebarWrapper = styled.div.attrs({ className: 'px-3 volume-bar' })`
    ${barWrapperStyle};
`;
const BarOuter = styled.div.attrs({ className: 'rounded-pill' })`
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    pointer-events: none;
`;
const BarInner = styled.div.attrs({ className: 'bar rounded-pill' })`
    height: 4px;
    background-color: #f90;
    pointer-events: none;
`;
const BarHandle = styled.div.attrs({ className: 'rounded-circle handle' })`
    position: absolute;
    top: 2px;
    width: 4px;
    height: 4px;
    transform: translate(-50%, -50%);
    background-color: #f90;
    transition: width 0.2s, height 0.2s;
    pointer-events: none;
`;

const IconWrapper = styled.div.attrs({ className: 'm-0 p-1 p-sm-2 rounded-pill', role: 'button' })`
    position: relative;
    background-color: rgba(255, 255, 255, 0);
    transition: background-color 0.2s;
    &:hover {
        background-color: rgba(255, 255, 255, 0.3);
        transition: background-color 0.2s;
        & .icon-tooltip {
            display: block;
        }
    }
`;
const SpeakerIconWrapper = styled(IconWrapper)`
    & .volume-bar {
        display: none;
    }
    &:hover .volume-bar,
    &.dragging .volume-bar {
        width: 100px;
        display: block;
    }
`;

const IconTooltip = styled.div.attrs({ className: 'px-2 py-1 rounded text-nowrap text-white icon-tooltip' })`
    position: absolute;
    transform: translate(-50%, -50px);
    left: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    display: none;
`;
const FirstIconTooltip = styled(IconTooltip)`
    transform: translate(0, -50px);
    left: 0;
`;
const LastIconTooltip = styled(IconTooltip)`
    transform: translate(-100%, -50px);
    left: 100%;
`;
const Time = styled.div.attrs({ className: 'me-auto p-2 font-monospace text-white' })`
    font-size: 0.9rem;
    pointer-events: none;
`;

type ClickHandlers = {
    togglePlaying: () => void;
    onClickRewind: () => void;
    onClickForward: () => void;
    toggleMute: () => void;
    toggleTheaterMode: () => void;
    onClickFullscreen: () => void;
};

type Props = {
    details: VideoDetails;
    mode: VideoViewMode;
    setMode: (mode: VideoViewMode) => void;
};

const VideoPlayer: React.FC<Props> = ({ details, mode, setMode }: Props) => {
    const videoKey = details.key;
    const length = details.length ?? 0;
    const [playing, setPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [thumbnailCurrentTime, setThumbnailCurrentTime] = useState<number>(0);
    const [currentPercentage, setCurrentPercentage] = useState<string>('0%');
    const [thumbnailLeft, setThumbnailLeft] = useState<number>(0);
    const [thumbnailDisplay, setThumbnailDisplay] = useState<string>('none');
    const [muted, setMuted] = useState<boolean>(false);
    const [volumePercentage, setVolumePercentage] = useState<string>('100%');
    const [showSnapshotPreview, setShowSnapshotPreview] = useState<boolean>(false);
    const videoPlayerWrapperRef = useRef<HTMLDivElement>(null);
    const videoPlayIndicatorRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const seekbarWrapperRef = useRef<HTMLDivElement>(null);
    const seekbarOuterRef = useRef<HTMLDivElement>(null);
    const thumbnailRef = useRef<HTMLDivElement>(null);
    const speakerIcnoWrapperRef = useRef<HTMLDivElement>(null);
    const volumeWrapperRef = useRef<HTMLDivElement>(null);
    const volumeOuterRef = useRef<HTMLDivElement>(null);
    const hideControlTidRec = useRef<number>(0);
    const videoMouseMoveTidRef = useRef<number>(0);
    const clickHandlersRef = useRef<ClickHandlers>();
    const { t } = useI18n();
    const api = useApi();
    const toast = useToast();
    const src = api.getVideoUrl(videoKey);
    const duration = formatTimeInSecond(length);
    useEffect(() => {
        const video = videoRef.current;
        const seekbarOuter = seekbarOuterRef.current;
        const thumbnail = thumbnailRef.current;
        const seekbarWrapper = seekbarWrapperRef.current;
        const volumeOuter = volumeOuterRef.current;
        const speakerIcnoWrapper = speakerIcnoWrapperRef.current;
        const volumeWrapper = volumeWrapperRef.current;
        if (!video || !seekbarOuter || !thumbnail || !seekbarWrapper || !volumeOuter || !speakerIcnoWrapper || !volumeWrapper) {
            return;
        }
        let iid: number;
        updateCurrent();
        const onPlay = () => {
            iid = setInterval(updateCurrent, 10) as unknown as number;
        };
        const onPause = () => {
            clearInterval(iid);
        };
        const onFullscreenChange = () => {
            // TODO: handle mode
            if (document.fullscreenElement) {
                // fullscreen
            } else {
                // back to normal
            }
        };
        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);
        video.addEventListener('fullscreenchange', onFullscreenChange);

        const updateVolume = () => {
            const volume = video.volume;
            setVolumePercentage(`${volume * 100}%`);
        };

        let isSeekbarDragging = false;
        let seekbarX = 0;
        let seekbarWidth = 0;
        let isThubmnailShowing = false;
        let thumbnailWidth = 0;
        const setSeekbarValues = () => {
            const seekbarRect = seekbarOuter.getBoundingClientRect();
            seekbarX = seekbarRect.left + window.pageXOffset;
            seekbarWidth = seekbarRect.right - seekbarRect.left;
        };
        const onThumbnailStartShowing = (e: MouseEvent) => {
            setThumbnailDisplay('block');
            setSeekbarValues();
            const thumbnailRect = thumbnail.getBoundingClientRect();
            thumbnailWidth = thumbnailRect.right - thumbnailRect.left;
            isThubmnailShowing = true;
            onMouseMove(e);
        };
        const onSeekbarStartDragging = (e: MouseEvent) => {
            seekbarWrapper.classList.add('dragging');
            setSeekbarValues();
            isSeekbarDragging = true;
            onMouseMove(e);
        };
        let isVolumeDragging = false;
        let volumeX = 0;
        let volumeWidth = 0;
        const onVolumeStartDragging = (e: MouseEvent) => {
            const volumeRect = volumeOuter.getBoundingClientRect();
            volumeX = volumeRect.left + window.pageXOffset;
            volumeWidth = volumeRect.right - volumeRect.left;
            isVolumeDragging = true;
            speakerIcnoWrapper.classList.add('dragging');
            volumeWrapper.classList.add('dragging');
            onMouseMove(e);
        };

        const onMouseMove = (e: MouseEvent) => {
            const cursorX = e.pageX;
            const calcSeekbarRate = () => {
                return Math.max(0, Math.min((cursorX - seekbarX) / seekbarWidth, 1));
            };
            if (isSeekbarDragging) {
                const seekbarRate = calcSeekbarRate();
                video.currentTime = seekbarRate * length;
                updateCurrent();
            }
            if (isThubmnailShowing) {
                const seekbarRate = calcSeekbarRate();
                const thumbnailLeft = Math.max(0, Math.min(seekbarRate * seekbarWidth - thumbnailWidth / 2, seekbarWidth - thumbnailWidth));
                setThumbnailLeft(thumbnailLeft);
                setThumbnailCurrentTime(seekbarRate * length);
            }
            if (isVolumeDragging) {
                const volume = Math.max(0, Math.min((cursorX - volumeX) / volumeWidth, 1));
                video.volume = volume;
                updateVolume();
            }
        };
        const onMouseOut = (e: MouseEvent) => {
            if (!e.target) {
                return;
            }
            const targetEl = e.target as Element;
            const id = targetEl.getAttribute('id');
            if (id !== 'root') {
                return;
            }
            onStopDragging(e);
        };
        const onStopThumbnailShowing = () => {
            setThumbnailDisplay('none');
        };
        const onStopDragging = (e: MouseEvent) => {
            onMouseMove(e);
            isSeekbarDragging = false;
            isVolumeDragging = false;
            seekbarWrapper.classList.remove('dragging');
            speakerIcnoWrapper.classList.remove('dragging');
            volumeWrapper.classList.remove('dragging');
        };
        seekbarWrapper.addEventListener('mouseover', onThumbnailStartShowing);
        seekbarWrapper.addEventListener('mousedown', onSeekbarStartDragging);
        seekbarWrapper.addEventListener('mouseout', onStopThumbnailShowing);
        volumeWrapper.addEventListener('mousedown', onVolumeStartDragging);
        document.body.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseout', onMouseOut);
        document.body.addEventListener('mouseup', onStopDragging);
        return () => {
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
            video.removeEventListener('fullscreenchange', onFullscreenChange);
            clearInterval(iid);
            seekbarWrapper.removeEventListener('mouseover', onThumbnailStartShowing);
            seekbarWrapper.removeEventListener('mousedown', onSeekbarStartDragging);
            seekbarWrapper.removeEventListener('mouseout', onStopThumbnailShowing);
            volumeWrapper.removeEventListener('mousedown', onVolumeStartDragging);
            document.body.removeEventListener('mousemove', onMouseMove);
            document.body.removeEventListener('mouseout', onStopDragging);
            document.body.removeEventListener('mouseup', onStopDragging);
        };
    }, [src]);

    const withCurrent = (func: (values: { video: HTMLVideoElement; playerWrapper: HTMLDivElement; indicator: HTMLDivElement }) => void) => {
        const video = videoRef.current;
        const playerWrapper = videoPlayerWrapperRef.current;
        const indicator = videoPlayIndicatorRef.current;
        if (!video || !playerWrapper || !indicator) {
            return;
        }
        func({ video, playerWrapper, indicator });
    };
    const hideControl = () => {
        withCurrent(({ playerWrapper }) => {
            playerWrapper.classList.add('hide-control');
            hideControlTidRec.current = setTimeout(() => {
                playerWrapper.classList.add('remove-control');
            }, 200) as unknown as number;
        });
    };
    const showControl = () => {
        clearTimeout(hideControlTidRec.current);
        clearTimeout(videoMouseMoveTidRef.current);
        withCurrent(({ playerWrapper }) => {
            playerWrapper.classList.remove('hide-control');
            playerWrapper.classList.remove('remove-control');
        });
    };
    const animateIndicator = (indicator: HTMLDivElement) => {
        indicator.style.display = 'block';
        setTimeout(() => {
            indicator.classList.add('animate');
        }, 10);
        setTimeout(() => {
            indicator.classList.remove('animate');
            indicator.style.display = 'none';
        }, 510);
    };
    const updateCurrent = () => {
        withCurrent(({ video }) => {
            const currentTime = video.currentTime;
            setCurrentTime(currentTime);
            setCurrentPercentage(`${(currentTime / length) * 100}%`);
        });
    };
    const onClickPause = () => {
        withCurrent(({ video, indicator }) => {
            video.pause();
            animateIndicator(indicator);
            setPlaying(false);
            showControl();
        });
    };
    const onClickPlay = () => {
        withCurrent(({ video, indicator }) => {
            video
                .play()
                .then(() => {
                    animateIndicator(indicator);
                    setPlaying(true);
                    showControlTemporary();
                })
                .catch((e) => {
                    console.error(e);
                    toast.addError(t('Video page'), [
                        t('Failed to play the video.'),
                        t('Consider to convert the video to MP4 if the video is unsupported format.'),
                    ]);
                });
        });
    };
    const onClickRewind = () => {
        withCurrent(({ video }) => {
            video.currentTime = Math.max(video.currentTime - 10, 0);
            updateCurrent();
        });
    };
    const onClickForward = () => {
        withCurrent(({ video }) => {
            video.currentTime = Math.min(video.currentTime + 30, details.length ?? 0);
            updateCurrent();
        });
    };
    const toggleMute = () => {
        withCurrent(({ video }) => {
            video.muted = !muted;
            setMuted(!muted);
            onVideoMouseMove();
        });
    };
    const togglePlaying = () => {
        if (playing) {
            onClickPause();
        } else {
            onClickPlay();
        }
    };
    const showControlTemporary = () => {
        showControl();
        videoMouseMoveTidRef.current = setTimeout(() => {
            if (seekbarWrapperRef.current?.classList.contains('dragging') || thumbnailDisplay === 'block') {
                // don't hide control while dragging seekbar or showing thumbnail even no pointer move
                showControlTemporary();
                return;
            }
            hideControl();
        }, 1000) as unknown as number;
    };
    const onVideoMouseMove = () => {
        if (!playing) {
            return;
        }
        showControlTemporary();
    };
    const onClickSnapshot = () => {
        setShowSnapshotPreview(true);
    };
    const updateSnapshot = (canvas: HTMLCanvasElement) => {
        const dataURL = canvas.toDataURL();
        api.postSnapshot(videoKey, dataURL);
    };
    const onClickNormal = () => {
        setMode('normal');
    };
    const onClickTheater = () => {
        setMode('theater');
    };
    const toggleTheaterMode = () => {
        if (mode !== 'theater') {
            onClickTheater();
        } else {
            onClickNormal();
        }
    };
    const onClickFullscreen = () => {
        videoRef.current?.requestFullscreen();
    };
    clickHandlersRef.current = {
        togglePlaying,
        onClickRewind,
        onClickForward,
        toggleMute,
        toggleTheaterMode,
        onClickFullscreen,
    };
    useEffect(() => {
        const handleShortcuts = (e: KeyboardEvent) => {
            const target = e.target as Element | null;
            if (target && target.tagName === 'INPUT') {
                return;
            }
            const clickHandlers = clickHandlersRef.current;
            if (!clickHandlers) {
                return;
            }
            switch (e.code) {
                case 'Space':
                    e.preventDefault();
                    clickHandlers.togglePlaying();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    clickHandlers.onClickRewind();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    clickHandlers.onClickForward();
                    break;
                case 'KeyM':
                    e.preventDefault();
                    clickHandlers.toggleMute();
                    break;
                case 'KeyT':
                    e.preventDefault();
                    clickHandlers.toggleTheaterMode();
                    break;
                case 'KeyF':
                    e.preventDefault();
                    clickHandlers.onClickFullscreen();
                    break;
            }
        };
        document.body.addEventListener('keydown', handleShortcuts);
        return () => {
            document.body.removeEventListener('keydown', handleShortcuts);
        };
    }, []);
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    return (
        <>
            <SnapshotPreview
                show={showSnapshotPreview}
                setShow={setShowSnapshotPreview}
                details={details}
                video={videoRef.current}
                updateSnapshot={updateSnapshot}
            />
            <VideoPlayerWrapper ref={videoPlayerWrapperRef as any} onMouseMove={onVideoMouseMove}>
                <VideoPlayIndicator ref={videoPlayIndicatorRef as any}>{playing ? <PlayIndicatorIcon /> : <PauseIndicatorIcon />}</VideoPlayIndicator>
                <VideoWrapper>
                    <Video src={src} ref={videoRef as any} onClick={togglePlaying} />
                </VideoWrapper>
                <VideoControl>
                    <div className="mt-auto"></div>
                    <SeekbarWrapper ref={seekbarWrapperRef as any}>
                        <BarOuter ref={seekbarOuterRef as any}>
                            <VideoThumbnail
                                details={details}
                                currentTime={thumbnailCurrentTime}
                                display={thumbnailDisplay}
                                left={thumbnailLeft}
                                ref={thumbnailRef}
                            />
                            <BarInner style={{ width: currentPercentage }} />
                            <BarHandle style={{ left: currentPercentage }} />
                        </BarOuter>
                    </SeekbarWrapper>
                    <Stack direction="horizontal" className="m-2">
                        {playing ? (
                            <IconWrapper onClick={onClickPause}>
                                <FirstIconTooltip>{t('Pause (space)')}</FirstIconTooltip>
                                <PauseIcon />
                            </IconWrapper>
                        ) : (
                            <IconWrapper onClick={onClickPlay}>
                                <FirstIconTooltip>{t('Play (space)')}</FirstIconTooltip>
                                <PlayIcon />
                            </IconWrapper>
                        )}
                        <IconWrapper onClick={onClickRewind}>
                            <IconTooltip>{t('Rewind (←)')}</IconTooltip>
                            <RewindIcon />
                        </IconWrapper>
                        <IconWrapper onClick={onClickForward}>
                            <IconTooltip>{t('Forward (→)')}</IconTooltip>
                            <ForwardIcon />
                        </IconWrapper>
                        <SpeakerIconWrapper ref={speakerIcnoWrapperRef as any}>
                            <IconTooltip>{t('Mute (m)')}</IconTooltip>
                            <Stack direction="horizontal">
                                <span onClick={toggleMute}>{muted ? <MutedIcon /> : <SpeakerIcon />}</span>
                                <VolumebarWrapper ref={volumeWrapperRef as any}>
                                    <BarOuter ref={volumeOuterRef as any}>
                                        <BarInner style={{ width: volumePercentage }} />
                                        <BarHandle style={{ left: volumePercentage }} />
                                    </BarOuter>
                                </VolumebarWrapper>
                            </Stack>
                        </SpeakerIconWrapper>
                        <Time>
                            {formatTimeInSecond(currentTime)}/{duration}
                        </Time>
                        <IconWrapper onClick={onClickSnapshot}>
                            <IconTooltip>{t('Snapshot')}</IconTooltip>
                            <SnapshotIcon />
                        </IconWrapper>
                        {mode !== 'normal' && (
                            <IconWrapper onClick={onClickNormal}>
                                <IconTooltip>{t('Normal (t)')}</IconTooltip>
                                <NormalIcon />
                            </IconWrapper>
                        )}
                        {mode !== 'theater' && (
                            <IconWrapper onClick={onClickTheater}>
                                <IconTooltip>{t('Theater (t)')}</IconTooltip>
                                <TheaterIcon />
                            </IconWrapper>
                        )}
                        {mode !== 'fullScreen' && (
                            <IconWrapper onClick={onClickFullscreen}>
                                <LastIconTooltip>{t('Full screen (f)')}</LastIconTooltip>
                                <FullScreenIcon />
                            </IconWrapper>
                        )}
                    </Stack>
                </VideoControl>
            </VideoPlayerWrapper>
        </>
    );
    /* eslint-enable  @typescript-eslint/no-explicit-any */
};

export default VideoPlayer;
