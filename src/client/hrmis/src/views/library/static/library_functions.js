import { categoryInputCategory } from './library_input_items';

export const categoryLevel = (value) => {
	const container = categoryInputCategory;
	let output;
	container.forEach((data) => {
		if (data.id === value) output = data.title;
	});
	return output;
};