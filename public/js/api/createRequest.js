/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    let formData = new FormData();
    xhr.responseType = "json";
    let requestUrl = options.url;
    
    if (options.method === "GET") {
        requestUrl += "?";
        for (let key in options.data) {
            requestUrl += `${key}=${options.data[key]}&`;
        }
        requestUrl = requestUrl.slice(0, -1);
    } else { 
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
    }

    try {
      xhr.open(options.method, requestUrl);
      xhr.send(formData);
    }
    catch (err) {
      // перехват сетевой ошибки
      options.callback(err);
    }

    xhr.addEventListener("load", () => options.callback(null, xhr.response));
    xhr.addEventListener("error", () => options.callback(xhr.statusText, null));
};
