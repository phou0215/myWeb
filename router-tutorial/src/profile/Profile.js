import React from "react";

const data = {
  velopert: {
    names: ["Alex", "Peter", "Richard", "Hensel"],
    description:
      "This Operation Project is about assasination of Middle Asia major target. and starting August 4th 1996",
  },
  iron_hand: {
    names: ["sergio", "Ferdinant", "Rechardo", "suwon"],
    description:
      "This Operation Project is about support and watching of syndicate target. and starting March 20th 2003",
  },
};

const Profile = ({ match }) => {
  const { username } = match.params;
  const profile = data[username];
  if (!profile) {
    return (
      <div>
        <h2>
          We don't have operation such as {username} in server. Please check
          again
        </h2>
      </div>
    );
  } else {
    return (
      <div>
        {profile.names.map((name, idx) => {
          return <h3 key={idx}>Unit name: {name}</h3>;
        })}
        <p>{profile.description}</p>
      </div>
    );
  }
};

export default React.memo(Profile);
