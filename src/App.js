import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './App.css';
import _ from 'lodash';

const App = () => {
	const items = [
		{ title: 'Total sales1', value: '$130.78', content: '3 orders', thumb: 'Live' },
		{ title: 'Online Store sessions2', value: '17', content: '17 visitors', thumb: 'Today' },
		{ title: 'Total sales1', value: '$1.96k', content: '20 orders', thumb: 'Today' },
		{ title: 'Total sales1', value: '$1.96k', content: '20 orders', thumb: 'Today' },
		{ title: 'Online Store sessions2', value: '78', content: '3 visitors', thumb: 'Yesterday' },
		{ title: 'Visitors1', value: '0', content: 'right now', thumb: 'Yesterday' },
		{ title: 'Total sales2', value: '$130.78', content: '3 orders', thumb: 'This Week' },
		{ title: 'Total sales1', value: '$1.96k', content: '20 orders', thumb: 'This Week' },
		{ title: 'Total sales1', value: '$1.96k', content: '20 orders', thumb: 'This Week' },
		{ title: 'Online Store sessions2', value: '78', content: '3 visitors', thumb: 'This Month' },
		{ title: '', value: '', content: '', thumb: '' },
	];

	let thumbs = [...new Set(items.map((x) => x.thumb))];
	thumbs = thumbs.filter((x) => x);

	const imageItems = [
		'https://unsplash.it/475/205',
		'https://unsplash.it/476/205',
		'https://unsplash.it/477/205',
		'https://unsplash.it/478/205',
		'https://unsplash.it/479/205',
		'https://unsplash.it/475/205',
		'https://unsplash.it/476/205',
		'https://unsplash.it/477/205',
		'https://unsplash.it/478/205',
		'https://unsplash.it/479/205',
		'https://unsplash.it/478/205',
		'https://unsplash.it/479/205',
	];

	const [state, setState] = useState({
		currentIndex: 0,
		responsive: {
			0: {
				items: 2,
			},
			500: {
				items: 2,
			},
		},
		galleryItems: items.map((item, i) => (
			<div className='alice-item' key={i}>
				<p>{item?.title}</p>
				<p>{item?.value}</p>
				<p>{item?.content}</p>
			</div>
		)),
		imageItems: imageItems.map((item, i) => <img src={item} />),
	});

	const activeThumbStyle = {
		borderRadius: 5,
		background: '#5F69C0',
		color: '#EFF9FF',
	};

	const thumbStyle = {
		background: 'transparent',
		color: '#AFB5DD',
	};

	const slideTo = (item) => {
		const lastIndex = _.findLastIndex(items, function (o) {
			return o.thumb === item;
		});
		setState({ ...state, currentIndex: lastIndex });
	};

	const onSlideChanged = (e) => {
		setState({ ...state, currentIndex: e.item });
	};

	const thumbItem = (item, i) => {
		return (
			<span
				onClick={() => slideTo(item)}
				className='thumb-item'
				key={item}
				style={items[state.currentIndex].thumb === item ? activeThumbStyle : thumbStyle}
			>
				{item}
			</span>
		);
	};

	const handleOnDragStart = (e) => e.preventDefault();

	return (
		<div className='swiper'>
			<div className='thumb-wrap'>{thumbs.map(thumbItem)}</div>
			<AliceCarousel
				mouseTrackingEnabled
				touchTrackingEnabled
				dotsDisabled={true}
				buttonsDisabled={true}
				onDragStart={handleOnDragStart}
				items={state.galleryItems}
				responsive={state.responsive}
				slideToIndex={state.currentIndex}
				onSlideChanged={onSlideChanged}
				infinite={false}
				className='alice1'
			/>
			<AliceCarousel
				mouseTrackingEnabled
				touchTrackingEnabled
				dotsDisabled={true}
				buttonsDisabled={true}
				onDragStart={handleOnDragStart}
				items={state.imageItems}
				slideToIndex={state.currentIndex}
				onSlideChanged={onSlideChanged}
				infinite={false}
				className='alice2'
			/>
		</div>
	);
};

export default App;
