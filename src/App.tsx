import { useState } from "react";
import axios from "axios";
import { UserCard } from "./components/UserCard";
import { User } from "./types/api/user";
import "./styles.css";
import { UserProfile } from "./types/UserProfile";

// テストデータ
// const user = {
//   id: 1,
//   name: "aaa",
//   email: "aaa@bbb.com",
//   address: "aaaaaaa"
// };

export default function App() {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>();

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  const onClickFetchData = () => {
    setLoading(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        // 変換をかけて必要なものだけ渡す
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfiles(data);
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <button onClick={onClickFetchData}>データ取得</button>
      <br />
      {isError ? (
        <p style={{ color: "red" }}>データ取得失敗</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {userProfiles?.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </div>
  );
}
