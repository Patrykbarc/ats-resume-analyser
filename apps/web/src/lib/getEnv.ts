export const getEnv = () => {
	const API_URL = import.meta.env.VITE_API_URL
	const API_KEY = import.meta.env.VITE_API_KEY

	if (!API_KEY || !API_URL) {
		throw new Error("Missing API_KEY or API_URL env variable")
	}

	return { API_KEY, API_URL }
}
