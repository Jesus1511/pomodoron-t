export const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;  

    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const formatHours = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;  

    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes} h`;
};

export const formatHour = (timestamp) => {
    let date = new Date(timestamp);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'p.m' : 'a.m';

    hours = hours % 12;
    hours = hours ? hours : 12;

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return timeString = hours + ':' + minutes + ' ' + ampm
}

export const timeThereshold = (workingTime, restingTime) => {
    let suma = workingTime + restingTime;

    let w = Math.floor((workingTime / suma) * 100);
    let r = Math.floor((restingTime / suma) * 100);

    const padWithZero = (num) => (num < 10 ? "0" + num : num.toString());

    w = padWithZero(w);
    r = padWithZero(r);

    return {w, r};
};

export const parseSeconds = (hours, minutes) => {
    let seconds = 0; 
    seconds = seconds + (hours * 3600);
    seconds = seconds + (minutes * 60);
    return seconds;
};

export const parseToHours = (seconds) => {
    const response = Math.floor(seconds / 3600)
    return response
};

export const parseToMinutes = (seconds) => {
    const response = Math.floor((seconds - (parseToHours(seconds) * 3600)) / 60)
    return response
};
