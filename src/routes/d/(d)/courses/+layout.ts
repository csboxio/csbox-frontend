export const load = async ({ fetch }) => {
    const fetchAndParse = async (url) => {
        const response = await fetch(url);
        return response.json();
    };

    const user = await fetchAndParse('/api/users');
    const courses = await fetchAndParse('/api/courses');

    return {
        user,
        courses,
    };
};