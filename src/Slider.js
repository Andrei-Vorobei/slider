import './Slider.scss';
import { useEffect, useState } from 'react';

const Slider = () => {
	const [sliderWidth, setSliderWidth] = useState();
	const [sliderTrack, setSliderTrack] = useState();
	const [slides, setSlides] = useState();
	const [dots, setDots] = useState();
	const [slideIndex, setSlideIndex] = useState(0);

	useEffect(() => {
		const slider = document.querySelector('.react-slider');
		const sliderWindow = slider.querySelector('.slider-wrapper');

		const sliderTrack = slider.querySelector('.slider-track');
		setSliderTrack(sliderTrack);

		const slides = slider.querySelectorAll('.slider-item');
		setSlides(slides);

		const sliderWidth = parseInt(window.getComputedStyle(sliderWindow).width);
		setSliderWidth(sliderWidth);
		
		window.addEventListener('resize', () => {
			const sliderWidth = parseInt(window.getComputedStyle(sliderWindow).width);
			setSliderWidth(sliderWidth);
		});
	}, []);
	
	useEffect(() => {
		sliderTrack && setSliderTrackWidth();
		slides && setSlidesWidth();
		
		sliderTrack && switchSlider();
	});
	
	useEffect(() => {
		slides && setDots(renderDots(slides, slideIndex));
	}, [slideIndex, slides]);

	function renderDots(slides, slideIndex) {
		const dots = [];

		for (let i = 0; i < slides.length; i++) {
			let cls = 'slider-dot';

			if (i === slideIndex) {
				cls += ' active';
			}

			dots.push(
				<li 
					key={i}
					className={cls}
					onClick={() => setSlideIndex(i)}>
					{i + 1}
				</li>
			)
		}

		return dots;
	}

	function switchSlider() {
		sliderTrack.style.transform = `translateX(-${slideIndex * sliderWidth}px)`;
	}

	function setSlidesWidth() {
		slides.forEach(slide => {
			slide.style.width = `${sliderWidth * slides.length}px`;
		});
	}

	function setSliderTrackWidth() {
		sliderTrack.style.width = `${sliderWidth * slides.length}px`;
	}

	function btnHandler(n) {
		if (n === -1) {
			setSlideIndex(prevIndx => {
				if (prevIndx === 0) {
					return slides.length - 1;
				} else {
					return prevIndx + n;
				}
			})
		} else {
			setSlideIndex(prevIndx => {
				if (prevIndx === slides.length - 1) {
					return 0;
				} else {
					return prevIndx + n;
				}
			})
		}
	}

	return (
		<div className="react-slider">
			<div className="slider-wrapper">
				<div className="slider-track">
					<div className="slider-item">
						<div className="slide-content">
							<span>
								Slide content 1
							</span>
						</div>
					</div>
					<div className="slider-item">
						<div className="slide-content">
							<span>
								Slide content 2
							</span>
						</div>
					</div>
					<div className="slider-item">
						<div className="slide-content">
							<span>
								Slide content 3
							</span>
						</div>
					</div>
					<div className="slider-item">
						<div className="slide-content">
							<span>
								Slide content 4
							</span>
						</div>
					</div>
				</div>
			</div>
			<button 
				className="slider-btn btn-prev"
				onClick={() => btnHandler(-1)}>
				Prev
			</button>
			<button 
				className="slider-btn btn-next"
				onClick={() => btnHandler(1)}>
				Next
			</button>
			<ol className="slider-dots">
				{ dots }
			</ol>
		</div>
	);
}

export default Slider;