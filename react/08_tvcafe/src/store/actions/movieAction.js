import axios from 'axios'
import {
	moviesScheduledForTodayUrl,
	mixedMoviesUrl,
} from '../../utils/tvmazeApi'
import { currentDate } from '../../utils/getDates'
import {
	FETCH_MOVIES_LOADING,
	FETCH_MOVIES_SUCCESS,
	FETCH_MOVIES_FAIL,
} from '../types'

export const LoadMovies = () => async (dispatch) => {
	dispatch({
		type: FETCH_MOVIES_LOADING,
	})

	try {
		// movies scheduled for today
		const movieForTodayData = await axios.get(
			moviesScheduledForTodayUrl(currentDate)
		)
		const filteredTodayMoviesData = movieForTodayData.data.filter(
			(movie) =>
				movie._embedded.show.genres.length !== 0 && movie.name !== 'TBA'
		)

		// popular shows
		const showsData = await axios.get(mixedMoviesUrl())
		const popularShowsData = showsData.data.filter(
			(show) => show.rating.average >= 8
		)

		// animations
		const animationsData = showsData.data.filter(
			(show) => show.type === 'Animation'
		)

		dispatch({
			type: FETCH_MOVIES_SUCCESS,
			payload: {
				scheduledForToday: filteredTodayMoviesData,
				popularShows: popularShowsData,
				animations: animationsData,
				allMovies: showsData.data,
			},
		})
	} catch (error) {
		dispatch({
			type: FETCH_MOVIES_FAIL,
			payload: {
				error,
			},
		})
	}
}
