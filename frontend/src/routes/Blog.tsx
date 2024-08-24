import { BlogCard } from "@/components/BlogCard"
import { Header } from "@/components/Header"

export const Blog = () => {
    return (
        <div>
            <Header/>
            <div className="flex justify-center">
            <BlogCard
            title="Blog Title"
            content="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            author="Author"
            publishedDate="Published Date"
            />
            </div>
            <div className="flex justify-center">
            <BlogCard
            title="Blog Title"
            content="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            author="Author"
            publishedDate="Published Date"
            />
            </div>
            <div className="flex justify-center">
            <BlogCard
            title="Blog Title"
            content="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            author="Author"
            publishedDate="Published Date"
            />
            </div>
            <div className="flex justify-center">
            <BlogCard
            title="Blog Title"
            content="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            author="Author"
            publishedDate="Published Date"
            />
            </div>
        </div>
    )
}