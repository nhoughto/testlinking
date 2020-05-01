export const createUserHandler = (req, res) => {
    // retrieve users or, if there are none, init to empty array
    state.users = state.users || [];

    // persist user by adding to the state object
    state.users.push(req.body);

    return res.json({status: "ok"});
}

export const getUsersHandler = (req, res) => {
    // retrieve users or, if there are none init, to empty array
    state.users = state.users || [];

    return res.json(state.users);
}

export const getUserByUsernameHandler = (req, res) => {
    // retrieve users or, if there are none, init to empty array
    state.users = state.users || [];

    // route param {username} is available on req.params
    var username = req.params.username;

    // log it to the console
    console.log("Getting user " + username + " details");

    // use lodash to find the user in the array
    var user = _.find(state.users, { "username": username});

    return res.json(user);
}