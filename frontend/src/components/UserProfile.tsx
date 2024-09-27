import { Image } from "lucide-react";
import { Header } from "./Header";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/constants/config";
import IdBlog from "./IdBlog";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";

const UserProfile = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
  });

  const { user, loading } = useUser();

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/user/profile`,
        input,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setInput(response.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error fetching data: " + error);
      toast.error("Error updating profile");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <div className="flex flex-col h-screen p-4 mt-24">
        <div className="flex justify-center w-full">
          <div className="w-full max-w-lg p-8 bg-white border dark:bg-slate-900 rounded-xl">
            <div className="mb-8 text-2xl font-bold text-center">
              <div>Edit Profile</div>
            </div>
            <div className="flex items-center justify-center">
              {" "}
              <img
                src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
                width={150}
                height={150}
              />
              <div className="mx-auto text-xl">
                <div className="mt-4 font-semibold">
                  {loading ? "Loading..." : "Name: " + user.name}
                </div>
                <div className="mt-4 font-semibold">
                  {loading ? "Loading..." : "Email: " + user.email}
                </div>
              </div>
            </div>

            <div className="flex justify-center my-4">
              <Label
                htmlFor="file-upload"
                className="cursor-pointer p-2.5  bg-slate-900 text-white rounded-md dark:bg-white dark:text-black"
              >
                <div className="flex items-center gap-2">
                  <Image size={17} /> <span>Edit Avatar</span>
                </div>
                <Input type="file" id="file-upload" className="hidden" />
              </Label>
            </div>
            <div className="flex-grow">
              <div className="mb-2 font-semibold">Username</div>
              <Input
                name="name"
                value={input.name}
                onChange={handleChange}
                type="text"
                placeholder="Name"
                className="w-full mb-2"
              />
              <div className="mb-2 font-semibold">Email</div>
              <Input
                name="email"
                value={input.email}
                onChange={handleChange}
                type="text"
                placeholder="Email"
                className="w-full"
              />
            </div>
            <Button
              onClick={handleSubmit}
              className="w-full mt-6"
              variant={"default"}
            >
              Submit
            </Button>
          </div>
        </div>
        <IdBlog />
      </div>
    </div>
  );
};

export default UserProfile;
