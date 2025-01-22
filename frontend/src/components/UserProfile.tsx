import { Header } from "./Header";
import IdBlog from "./IdBlog";

const UserProfile = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col h-screen">
        <IdBlog />
      </div>
    </div>
  );
};

export default UserProfile;
