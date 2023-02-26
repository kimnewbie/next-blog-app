import { NextPage } from "next";
import { BLOCKED_PAGES } from "next/dist/shared/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { getBlogs } from "../lib/blogs";

async function getInitialBlogs() {
  const blogs = getBlogs();
  return blogs;
}

const shortify = (text: string, maxLength = 60) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + " ...";
};

const Page: NextPage = () => {
  const blogs = use(getInitialBlogs());

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Blogs</h2>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className="group relative"
          >
            <div className="relative min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
              <Image
                fill
                src={blog.coverImage}
                alt=""
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{blog.title}</h3>
            <p className="mt-1 text-md font-medium text-gray-900">
              {shortify(blog.description, 100)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Page;
