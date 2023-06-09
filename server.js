const jsonServer = require("json-server");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const dbUsers = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));
const cors = require('cors')

const SECRET_KEY = "12132sdqd4sds1s5d";
const REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// jwt functions manager
function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
}

function authenticate({ email }) {
    if (dbUsers.users.find((user) => user.email === email))
        throw new Error("email already used !");
}

// jsonServer and router init
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
server.use(jsonServer.bodyParser)
server.use(cors)
// routes user authentification

server.post("/auth/sign", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!REGEX.test(email)) throw new Error("Invalid email");
    try {
        authenticate({ email, password });
        fs.readFile("./users.json", (err, data) => {
            if (err) {
                throw new Error(err.message);
            }

            let userData = JSON.parse(userData.toString());
            let index = data.users[data.users.length - 1].id;

            //Add new user
            data.users.push({ id: index + 1, email: email, password: password });
            fs.writeFile("./users.json", JSON.stringify(data));
            const token = createToken({ email, password });

            console.log("Auth Token:" + token);
            res.status(200).json({ token });
        });
    } catch (error) {
        res.status(500).json(error.message);
    }
});


server.use((req, res, next) => {
    if (
        req.headers.authorization === undefined ||
        req.headers.authorization.split(" ")[0] !== "Bearer"
    ) {
        throw new Error("Unauthorized");
    }
    try {
        let auth;
        auth = verifyToken(req.headers.authorization.split(" ")[1]);

        if (auth instanceof Error) {
            return res.status(401).json("wrong token");
        }

        next();
    } catch (err) {
        res.status(401).json(err.message);
    }
});

server.use(router);

server.listen(3000, () => {
    console.log("JSON Server is running");
});
