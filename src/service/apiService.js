import axios from "axios";

const BASE_URL =
	process.env.NODE_ENV === "production"
		? "http://13.53.130.145/api" //futre domain
		: "http://localhost:8000/api";

// Create an instance of axios for routes that require a token
const apiWithToken = axios.create({
	baseURL: BASE_URL, // replace with your API base URL
	timeout: 10000, // request timeout
});

// Request interceptor for API calls
apiWithToken.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers["Authorization"] = "Bearer " + token;
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	},
);

// Response interceptor for API calls
apiWithToken.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = localStorage.getItem("refreshToken");
			// You can add your logic here to refresh the token
			return axios
				.post(`${BASE_URL}/refresh-token`, { refreshToken })
				.then((res) => {
					if (res.status === 201 || res.status === 200) {
						console.log("new token", res.data);
						const { accessToken, refreshToken } = res.data;
						localStorage.setItem("accessToken", accessToken);
						localStorage.setItem("refreshToken", refreshToken);
						return apiWithToken(originalRequest);
					}
				})
				.catch((err) => {
					console.error(err);
					return Promise.reject(error);
				});
		}
		return Promise.reject(error);
	},
);

// Create an instance of axios for routes that don't require a token
const apiWithoutToken = axios.create({
	baseURL: BASE_URL, // replace with your API base URL
	timeout: 10000, // request timeout
});

apiWithoutToken.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("error without token", error.response.data);
		return Promise.reject(error);
	},
);

const apiService = {
	get: (url, params, requiresToken = true) =>
		(requiresToken ? apiWithToken : apiWithoutToken).get(url, { params }),
	post: (url, body, requiresToken = true, isFormData = false) => {
		const config = isFormData
			? { headers: { "Content-Type": "multipart/form-data" } }
			: {};
		return (requiresToken ? apiWithToken : apiWithoutToken).post(
			url,
			body,
			config,
		);
	},
	put: (url, body, requiresToken = true, isFormData = false) => {
		const config = isFormData
			? { headers: { "Content-Type": "multipart/form-data" } }
			: {};
		return (requiresToken ? apiWithToken : apiWithoutToken).put(
			url,
			body,
			config,
		);
	},
	delete: (url, requiresToken = true) =>
		(requiresToken ? apiWithToken : apiWithoutToken).delete(url),
};

export default apiService;

//example usage
/**
 *
 *
 * import apiService from "./apiService";
 *
 * apiService
 *     .post("/endpoint", { key: "value" }, true, false)
 *     .then((response) => console.log(response.data));
 *
 */
// import api from "./api"; // path to your API service file

// // POST request with JSON body
// api
// 	.post("/endpoint", { key: "value" }, true, false)
// 	.then((response) => console.log(response.data));

// // POST request with form data body
// const formData = new FormData();
// formData.append("key", "value");
// api
// 	.post("/endpoint", formData, true, true)
// 	.then((response) => console.log(response.data));
