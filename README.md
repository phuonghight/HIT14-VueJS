# Lession 03

## I. Lifecycle Hooks

**Provides APIs, helping developers add code at special stages of a component**
![Lifecycle Hooks Diagram](https://vuejs.org/assets/lifecycle.MuZLBFAS.png)
_Lifecycle Hooks Diagram_

### 1. Before mount: `onBeforeMount()`

- Registers a hook to be called right before the component is to be mounted.
- When this hook is called, the component has finished setting up its reactive state.

```js
import { onBeforeMount } from 'vue';
onBeforeMount(callback);
```

### 2. Mounted: `onMounted()`

- Registers a callback to be called after the component has been mounted.

- Can be used to access the DOM.

```js
import { onMounted } from 'vue';
onMounted(callback);
```

### 3. Before update: `onBeforeUpdate()`

- Registers a hook to be called right before the component is about to update its DOM tree due to a reactive state change.
- Can be used to access the DOM state before Vue updates the DOM.

```js
import { onBeforeUpdate } from 'vue';
onBeforeUpdate(callback);
```

### 4. Updated: `onUpdated()`

- Registers a callback to be called after the component has updated its DOM tree due to a reactive state change.

```js
import { onUpdated } from 'vue';
onUpdated(callback);
```

### 5. Before unmoute: `onBeforeUnmout()`

- Registers a hook to be called right before a component instance is to be unmounted.

```js
import { onBeforeUnmout } from 'vue';
onBeforeUnmout(callback);
```

### 6. Unmouted: `onUnmounted()`

- Registers a callback to be called after the component has been unmounted.
- Use this hook to clean up manually created side effects such as timers, DOM event listeners or server connections.

```js
import { onUnmounted } from 'vue';
onUnmounted(callback);
```

## II. Axios: Promise based HTTP client for the browser and node.js

### 1. Installing

```bash
npm install axios
# or
yarn add axios
```

Code:

```js
import axios, { isCancel, AxiosError } from 'axios';
```

### 2. Example

```js
import axios from 'axios';
axios
  .get('api_url')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

// ES6
async function get(api_url) {
  try {
    const response = await axios.get(api_url);
    // handle success
    console.log(response);
    return response;
  } catch (error) {
    // handle error
    console.log(error);
  } finally {
    // always executed
  }
}
```

### 3. Request method

- Method: GET, POST, PUT, PATCH, DELETE
- With config

```js
// Send a POST request
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

### 4. Response Schema

```js
{
  // `data` is the response that was provided by the server
  data: {},
  // `status` is the HTTP status code from the server response
  status: 200,
  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',
  // `headers` the HTTP headers that the server responded with
  // All header names are lowercase and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  headers: {},
  // `config` is the config that was provided to `axios` for the request
  config: {},
  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance in the browser
  request: {}
}
```

### 5. Instance

```js
const config = {
  baseURL: 'https://some-domain.com/api/v1',
  headers: {
    // application/x-www-form-urlencoded, multipart/form-data, text/plain
    'Content-Type': 'application/json'
  }
};
const instance = axios.create(config);
```

### 6. Interceptors

```js
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
```
