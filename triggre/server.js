import { createServer } from "http";
import { readFile } from "fs";

const server = createServer(function(req, resp) {
    readFile("Documents/nodejs/demo.html", function(error, data) {
        if (error) {
            resp.writeHead(404);
            resp.write("Contents you are looking for-not found");
            resp.end();
        } else {
            resp.writeHead(200, {
                "Content-Type": "text/html",
            });
            resp.write(data.toString());
            resp.end();
        }
    });
});

server.listen(8081, "127.0.0.1");

console.log("Server running at http://127.0.0.1:8081/");