import * as dao from "./dao.js";
import {findUserByCredentials, findUserByUsername, findUsersByRole} from "./dao.js";

let currentUser = null;

function UserRoutes(app) {
    const createUser = async (req, res) => {
        const {username, password, email, role} = req.params;
        const user = await dao.createUser({
            username, password, email, role
        });
        res.json(user);
    };

    const deleteUser = async (req, res) => {
        const id = req.params.userId;
        const status = await dao.deleteUser(id);
        res.json(status);
    };

    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };

    const findUserById = async (req, res) => {
        const id = req.params.id;
        const user = await dao.findUserById(id);
    };

    const updateUser = async (req, res) => { };

    const signup = async (req, res) => { };

    const signin = async (req, res) => {
        const { username, password } = req.body;
        currentUser = await dao.findUserByCredentials(username, password);
        res.json(currentUser);
    };

    const signout = (req, res) => { };

    const account = async (req, res) => { };

    const findUserByUsername = async (req, res) => {
        const username = req.params.username;
        const user = await dao.findUserByUsername(username);
        res.json(user);
    };

    const findUserByCredentials = async (req, res) => {
        const {username, password} = req.params;
        const user = await dao.findUserByCredentials(username, password);
        res.json(user);
    }

    const findUsersByRole = async (req, res) => {
        const role = req.params.role;
        const users = await dao.findUsersByRole(role);
        res.json(users);
    }


    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/delete/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/account", account);
    app.get("/api/users/username/:username", findUserByUsername);
    app.get("/api/users/credentials/:username/:password", findUserByCredentials);
    app.get("/api/users/role/:role", findUsersByRole);
}
export default UserRoutes;