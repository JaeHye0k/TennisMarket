const http = require("http");

function start(route, handle) {
    function onRequest(request, response) {
        const parsedURL = new URL(request.url, "http://localhost:8888");
        const productId = parsedURL.searchParams.get("productId");
        const pathname = parsedURL.pathname;
        route(pathname, handle, response, productId);
    }

    http.createServer(onRequest).listen(8888);
}

exports.start = start;
