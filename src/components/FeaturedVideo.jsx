import React, { useEffect, useState } from 'react';
import data from '../data/data.json';
import { MainMenu } from './MainMenu';

export function FeaturedVideo() {
    const { Featured, TendingNow } = data;

    const [featuredVideo, setFeaturedVideo] = useState(Featured);
    const [showIframe, setShowIframe] = useState(false);
    const [previousId, setPreviousId] = useState(sessionStorage.getItem('lastClickedMovieId'));

    useEffect(() => {
        const checkForUpdates = () => {
            const updatedId = sessionStorage.getItem('lastClickedMovieId');

            if (updatedId && updatedId !== previousId) {
                const clickedMovie = TendingNow.find(movie => movie.Id === updatedId);
                if (clickedMovie) {
                    setFeaturedVideo(clickedMovie);
                    setShowIframe(false);

                    setTimeout(() => {
                        setShowIframe(true);
                    }, 2000);
                }
                setPreviousId(prevId => updatedId);
            }
        };

        const intervalId = setInterval(checkForUpdates, 500);

        return () => {
            clearInterval(intervalId);
        };
    }, [TendingNow, previousId]);

    const { Duration, CoverImage, Category, TitleImage, ReleaseYear, MpaRating, VideoUrl } = featuredVideo;

    const hours = Math.floor(Duration / 3600);
    const minutes = Math.floor((Duration % 3600) / 60);
    const duration = `${hours}h ${minutes}m`;

    return (
        <div className='homepage'>
            <MainMenu />
            <div className={`${!showIframe ? 'featuredVideoBlock' : 'video-player'}`}
                style={{
                    backgroundImage: !showIframe ? `url(/images/${CoverImage})` : 'none',
                }}>
                {showIframe ? (
                    <iframe
                        src={VideoUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ width: '100%', height: '100%' }}
                    ></iframe>
                ) : (
                    <div className='content'>
                        <div className='category'>{Category}</div>

                        <div
                            className='title-image'
                            style={{
                                backgroundImage: `url(/images/${TitleImage})`,
                            }}
                        ></div>

                        <div className='info'>
                            <span className='info-text'>{ReleaseYear}</span>
                            <span className='info-text'>{MpaRating}</span>
                            <span className='info-text'>{duration}</span>
                        </div>

                        <div className='description'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </div>

                        <div className='control-btns'>
                            <button type='button' className='play-btn'>
                                <i className="fa-solid fa-play"></i>
                                <span>Play</span>
                            </button>
                            <button type='button' className='info-btn'>
                                <span>More Info</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
