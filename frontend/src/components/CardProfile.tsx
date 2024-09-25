import { BACKEND_URL } from "@/constants/config";
import axios from "axios";
import { useEffect, useState } from "react";

const CardProfile = () => {
  const [author, setAuthor] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/name`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAuthor(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col justify-center p-8 mb-4 bg-white border rounded-lg dark:bg-slate-900 sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
      <div className="mb-4 text-2xl font-bold text-center">Author</div>
      <div className="flex flex-col items-center sm:flex-row">
        <img
          src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png"
          width={100}
          height={100}
          className="mb-4 sm:mb-0 sm:mr-4"
        />
        <div className="text-center sm:text-left">
          <div className="text-lg sm:text-xl md:text-2xl">{author.email}</div>
          <div className="text-lg sm:text-xl md:text-2xl">{author.name}</div>
        </div>
      </div>
    </div>
  );
};

export default CardProfile;
