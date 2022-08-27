import React from "react";

const Home = ({user}) => {
    return <div>{user?.email}</div>;
};

export default Home;