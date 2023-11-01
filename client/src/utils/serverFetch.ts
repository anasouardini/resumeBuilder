import { toast } from 'react-toastify';

const server = {
    url: 'http://localhost:2000',

    options: (method: string, body?: {}) => {
        // console.log(body);
        const options: RequestInit = {
            method,
            mode: 'cors',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json',
                accessToken: localStorage.getItem('accessToken') as string,
            },
            cache: 'default',
            credentials: 'include',
        };

        if (body) options.body = JSON.stringify(body);

        return options;
    },
};

const methods = {
    post: (route: string, body?: {}) => {
        return fetch(`${server.url}/${route}`, server.options('post', body))
            .then(async (res) => {
                return {
                    ...(await res.json().then((res) => res)),
                    status: res.status,
                };
            })
            .catch(() => false)
    },

    read: (route: string) =>
        fetch(`${server.url}/${route}`, server.options('get'))
            .then(async (res) => {
                return {
                    ...(await res
                        .json()
                        .then((res) => res)
                        .catch(() => false)),
                    status: res.status,
                };
            })
            .catch((err) => err),

    updateFile: (route: string, body?: {}) =>
        fetch(`${server.url}/${route}`, {
            method: 'put',
            credentials: 'include',
            body: JSON.stringify(body),
        })
            .then(async (res) => {
                return {
                    ...(await res
                        .json()
                        .then((res) => res)
                        .catch(() => false)),
                    status: res.status,
                };
            })
            .catch((err) => false),

    update: (route: string, body?: {}) => {
        // console.log('update route', route)
        return fetch(`${server.url}/${route}`, server.options('put', body))
            .then(async (res) => {
                return {
                    ...(await res
                        .json()
                        .then((res) => res)
                        .catch(() => false)),
                    status: res.status,
                };
            })
            .catch((err) => false)
    },

    remove: (route: string, body?: {}) =>
        fetch(`${server.url}/${route}`, server.options('delete', body))
            .then(async (res) => {
                return {
                    ...(await res
                        .json()
                        .then((res) => res)
                        .catch(() => false)),
                    status: res.status,
                };
            })
            .catch((err) => false),
};

const handleRequest = async (
    method: 'post' | 'read' | 'update' | 'updateFile' | 'remove',
    route: string,
    body?: {}
) => {

    if (route[0] == '/') { route = route.slice(1); }

    const response = await methods[method](route, body);

        try {
        } catch (err) {
            toast.error(`client error while trying to make a request. route:${route}`)
            return { err: 'connectionError', route };
        }

        if (response.status != 200) {
            toast.error(`${response}. route: ${route}`)
            return { err: 'serverError' };
        }

    return response;
};

export default handleRequest;