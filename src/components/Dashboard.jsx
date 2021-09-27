import React from 'react'
import { Typography } from 'antd'
import { useMoralis } from "react-moralis";

const { Title } = Typography

const Dashboard = () => {
    const { authenticate, isAuthenticated, user } = useMoralis();

    if (!isAuthenticated) {
        return (
            <div>
                <button onClick={() => authenticate()}>Authenticate</button>
            </div>
        );
    }

  return (
        <div>
            <h1>Welcome {user.get("username")}</h1>
        </div>
  );

}

export default Dashboard
