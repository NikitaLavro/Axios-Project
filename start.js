//AXIOS GLOBALS
axios.defaults.headers.common["X-Auth-token"] =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

// GET REQUEST
async function getTodos() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos",
      {
        params: { _limit: 5 },
      }
    );
    showOutput(response);
  } catch (error) {
    console.log(error);
  }
}

// POST REQUEST
async function addTodo() {
  try {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "New Todo",
        completed: false,
      }
    );
    showOutput(response);
  } catch (error) {
    console.log(error);
  }
}

// PUT/PATCH REQUEST
async function updateTodo() {
  try {
    const response = await axios.patch(
      "https://jsonplaceholder.typicode.com/todos/1",
      {
        title: "Updated Todo",
        completed: true,
      }
    );
    showOutput(response);
  } catch (error) {
    console.log(error);
  }
}

// DELETE REQUEST
async function removeTodo() {
  try {
    const response = await axios.patch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    showOutput(response);
  } catch (error) {
    console.log(error);
  }
}

// SIMULTANEOUS DATA
async function getData() {
  try {
    await axios
      .all([
        axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5"),
        axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
      ])
      .then(axios.spread((todos, posts) => showOutput(posts)));
  } catch (error) {
    console.log(error);
  }
}

// CUSTOM HEADERS
async function customHeaders() {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "sometoken",
      },
    };

    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "New Todo",
        completed: false,
      },
      config
    );
    showOutput(response);
  } catch (error) {
    console.log(error);
  }
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Hello World",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };

  axios(options).then((res) => showOutput(res));
}

// ERROR HANDLING
async function errorHandling() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos123141",
      {
        params: { _limit: 5 },
      }
    );
    showOutput(response);
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }

    if (err.response.status === 404) {
      alert("Error: Page Not Found");
    } else {
      alert(`${err.message}`);
    }
  }
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios
    .get("https://jsonplaceholder.typicode.com/todos", {
      cancelToken: source.token,
    })
    .then((res) => showOutput(res))
    .catch((thrown) => {
      if (axios.isCancel(thrown)) {
        console.log("Request canceled", thrown.message);
      }
    });

  if (true) {
    source.cancel("Request canceled!");
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

//axiosInstance.get("/comments")

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
