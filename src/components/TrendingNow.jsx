import React, { useRef, useEffect, useState } from 'react';
import data from '../data/data.json';

export function TrendingNow() {
    const { TendingNow } = data; // Adjusted to match your data structure
    const carouselRef = useRef(null);
    const isMouseDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const [cursorStyle, setCursorStyle] = useState('default'); // State for cursor style
    const [displayedMovies, setDisplayedMovies] = useState([]);

    const handleMouseDown = (e) => {
        isMouseDown.current = true;
        startX.current = e.pageX - carouselRef.current.offsetLeft;
        scrollLeft.current = carouselRef.current.scrollLeft;
        setCursorStyle('grab');
    };

    const handleMouseLeave = () => {
        isMouseDown.current = false;
        setCursorStyle('default');
    };

    const handleMouseUp = () => {
        isMouseDown.current = false;
        setCursorStyle('default');
    };

    const handleMouseMove = (e) => {
        if (!isMouseDown.current) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX.current) * 2; 
        carouselRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleMovieClick = (id) => {
        sessionStorage.setItem('lastClickedMovieId', id); 
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        carousel.addEventListener('mousedown', handleMouseDown);
        carousel.addEventListener('mouseleave', handleMouseLeave);
        carousel.addEventListener('mouseup', handleMouseUp);
        carousel.addEventListener('mousemove', handleMouseMove);

        return () => {
            carousel.removeEventListener('mousedown', handleMouseDown);
            carousel.removeEventListener('mouseleave', handleMouseLeave);
            carousel.removeEventListener('mouseup', handleMouseUp);
            carousel.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const lastClickedId = sessionStorage.getItem('lastClickedMovieId');
        if (lastClickedId) {
            const lastClickedMovie = TendingNow.find(movie => movie.Id === lastClickedId);
            const filteredMovies = TendingNow.filter(movie => movie.Id !== lastClickedId);
            if (lastClickedMovie) {
                setDisplayedMovies([lastClickedMovie, ...filteredMovies]);
            } else {
                setDisplayedMovies(TendingNow);
            }
        } else {
            setDisplayedMovies(TendingNow);
        }
    }, [TendingNow]);

    return (
        <div className='trending-now text-white'>
            <div className='title'>Trending Now</div>
            <div className='carousel-container'>
                <div 
                    className='carousel' 
                    ref={carouselRef} 
                    style={{ cursor: cursorStyle }} // Inline style for cursor
                >
                    {displayedMovies.map((item) => (
                        <div className='carousel-item' key={item.Id} onClick={() => handleMovieClick(item.Id)}>
                            <img src={`/images/${item.CoverImage}`} alt={item.Title} draggable="false" />
                            <p>{item.Title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
