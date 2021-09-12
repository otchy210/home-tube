export function fetchJson<T>(path: string): Promise<T> {
    return new Promise((resolve) => {
        fetch(path).then(result => {
            if (result.ok) {
                result.json().then(json => {
                    resolve(json);
                })
            } else {
                result.text().then(message => {
                    console.warn(`${result.status}: ${result.statusText} (${path})`, message);
                });
                resolve({} as T);
            }
        })
    });
};
