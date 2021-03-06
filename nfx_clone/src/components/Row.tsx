import React, { useState, useEffect } from 'react';
import YouTube from "react-youtube";
import axios from '../getDB/axios';
// stylesheets
import "../stylesheets/Row.scss";

const base_url = "https://image.tmdb.org/t/p/original";

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

// trailerのoption
type Options = {
	height: string;
	width: string;
	playerVars: {
		autoplay: 0 | 1 | undefined;
	};
};

export const Row = ({  title, fetchUrl, isLargeRow }: Props) => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [trailerUrl, setTrailerUrl] = useState<string | null>("");

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

	const opts: Options = {
		height: "390",
		width: "640",
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
		},
	};

	// トレイラーにyoutubeの映像を呼び出す
	const handleClick = async (movie: Movie) => {
		if (trailerUrl) {
			setTrailerUrl("");
		} else {
			let trailerurl = await axios.get(
				`/movie/${movie.id}/videos?api_key=~~~`
			);
			setTrailerUrl(trailerurl.data.results[0]?.key);
		}
	}

	return (
		<div className="Row">
			<h2>{ title }</h2>
			<div className="Row-posters">
				{/* ポスターコンテンツ */}
				{movies.map((movie, i) => (
					<img
						key={movie.id}
						className={`Row-poster ${isLargeRow && "Row-poster-large"}`}
						src={`${base_url}${
							isLargeRow ? movie.poster_path : movie.backdrop_path
						}`}
						alt={movie.name}
						onClick={() => handleClick(movie)}
					/>
				))}
			</div>
			{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
		</div>
	);
};