import axios from "axios";

const useAxiosCallHelper = () => {
	const methodCall = async (method, url, data = {}, header) => {
		const useHeader = header ?? { Content: "Content-Type: application/json" };
		const useMethod = method ?? "get";
		const options = {
			method: useMethod,
			headers: useHeader,
			data: data,
			url: url,
		};

		//	console.log(options);
		try {
			//Axios Request
			let result = await axios(options);

			//console.log(result);
			//Return Result when success
			return result;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
	return [methodCall];
};
export default useAxiosCallHelper;
