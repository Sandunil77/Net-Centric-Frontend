import { toast } from "react-toastify";
export const getRequest = async (endpoint, token) => {
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': token || '',
                'Accept': 'application/json', // Ensure the server knows JSON is expected
            },
        });

        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
            // Log the raw response for debugging
            const textResponse = await response.text();
            console.error('Raw server response:', textResponse);
            throw new Error('Response is not valid JSON');
        }

        const responseData = await response.json();
        return { data: responseData, status: response.status };
    } catch (error) {
        console.error('Error in getRequest:', error);
        throw error;
    }
};

export const postRequest = async (values) => {
    const response = await fetch(values.endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': values.token ? values.token : null,
            'Token': values.token ? values.token : null
        },
        body: JSON.stringify(values),
    });
    let responseData = JSON.parse(await response.text());
    await checkUserLoginStatus(responseData);
    return { data: responseData, status: response.status };
};

export const deleteRequest = async (endpoint, token) => {
    const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
            'Authorization': token ? token : null,
            'Token': token ? token : null
        },
    });
    let responseData = JSON.parse(await response.text());
    await checkUserLoginStatus(responseData);
    return { data: responseData, status: response.status };
};

export const putRequest = async (values) => {
    const response = await fetch(values.endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': values.token ? values.token : null,
            'Token': values.token ? values.token : null
        },
        body: JSON.stringify(values),
    });
    let responseData = JSON.parse(await response.text());
    await checkUserLoginStatus(responseData);
    return { data: responseData, status: response.status };
};

const checkUserLoginStatus = async (data) => {
    if (data.error && data.message === 'Not Authorized!') {
        toast.error(data.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        await delay(2000);
        deleteUser().then(() => {
            window.location.href = '/';
        });
    }
}

const delay = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const uploadFile = async (data, endpoint, token) => {
    const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: {
            'Authorization': token ? token : null,
            'Token': token ? token : null
        },
    });
    let responseData = JSON.parse(await response.text());
    await checkUserLoginStatus(responseData);
    return { data: responseData, status: response.status };
};
