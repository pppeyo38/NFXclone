import React, { useState, useEffect } from 'react';
import axios from '../getDB/axios';

// Propsのtitleとしてタイトル名を、fetchUrlとしてそのURLを貰う
type Props = {
	title: string;
	fetchUrl: string;
	isLargeRow?: boolean;
};

type Movie = {
	id: string;
	name: string;
	title: string;
	original_name: string;
	poster_path: string;
	backdrop_path: string;
};

export const Row = ({  title, fetchUrl }: Props) => {
	const [movies, setMovies] = useState<Movie[]>([]);

	// 非同期処理？
	// ページの表示をいち早く行って、非同期処理を使って後から処理が終わった順でAPIデータを入れていく
	// 非同期処理の発火をfetchUrlの変更に設定
	// データのstateを更新
	useEffect(() => {
		async function fetchData() {
			const request = await axios.get(fetchUrl);
			setMovies(request.data.results);
			return request;
		}
		fetchData();
	}, [fetchUrl]);

	console.log(movies);

	return (
		<div className="Row"/>
	);
};