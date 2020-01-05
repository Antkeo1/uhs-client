export const create = (userId, token, photo) => {
    return fetch(`${process.env.REACT_APP_API_URL}/khmerImage/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: photo
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/khmerImage`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singlePhoto = (imageId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/khmerImage/${imageId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const remove = (photoId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/khmerImage/delete/${photoId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const update = (photoId, token, photo) => {
    return fetch(`${process.env.REACT_APP_API_URL}/khmerImage/edit/${photoId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: photo
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
