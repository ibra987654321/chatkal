export const getToken = () => localStorage.getItem('vcv-token')

export const setToken = token => {
    localStorage.setItem('vcv-token', token)
}
export const removeToken = () => {
    localStorage.removeItem('vcv-token')
}
export const getVideoPosition = () => localStorage.getItem('video-position')

export const setVideoPosition = position => {
    localStorage.setItem('video-position', position)
}
export const removeVideoPosition = () => {
    localStorage.removeItem('video-position')
}
export const setId = id => {
    localStorage.setItem('candidate-id', id)
}
export function setCandidateType(id) {
    localStorage.setItem('candidateType', id)
}

export function getCandidateType() {
    return localStorage.getItem('candidateType')
}
export const removeCandidateType = () => {
    localStorage.removeItem('candidateType')
}
export const getId = () => localStorage.getItem('candidate-id')
export const removeId = () => {
    localStorage.removeItem('candidate-id')
}
export const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export const cleanLocal = () => {
    removeId()
    removeToken()
    removeCandidateType()
}
