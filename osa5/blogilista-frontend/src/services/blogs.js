import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => 
{
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
};

const postBlog = (token, content) =>
{
	const headers = { "Authorization": `Bearer ${token}`};
	const request = axios.post(baseUrl, content, { headers });
	return request.then(response => response.data);   
};

export default { getAll, postBlog };
