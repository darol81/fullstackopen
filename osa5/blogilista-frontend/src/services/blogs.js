import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => 
{
	const request = axios.get(baseUrl);
	return request.then(response => response.data);
};

const getbyID = (id) =>
{
    const url = `${baseUrl}/${id}`;
	const request = axios.get(url);
	return request.then(response => response.data);
};

const postBlog = (token, content) =>
{
	const headers = { "Authorization": `Bearer ${token}`};
	const request = axios.post(baseUrl, content, { headers });
	return request.then(response => response.data);   
};

const updateBlog = (token, id, content) =>
{
	const headers = { "Authorization": `Bearer ${token}`};
    const url = `${baseUrl}/${id}`;
	const request = axios.put(url, content, { headers });
	return request.then(response => response.data);   
}

export default { getAll, getbyID, postBlog, updateBlog };
