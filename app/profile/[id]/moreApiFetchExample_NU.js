import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

// This is called server side fetching \\ refer "dashboard.jsx" for traditional/client side api call
// https://nextjs.org/learn/dashboard-app/fetching-data#using-server-components-to-fetch-data
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store", //no cache
  });

  if (!res.ok) {
    return notFound(); //displays not found screen from next js
  }

  return res.json();
}

export async function generateMetadata({ params }) {
  const post = await getData(params.id); //sending params data to api
  return {
    title: post.title,
    description: post.desc,
  };
}

const BlogPost = async ({ params }) => {
  //-----IN SERVER SIDE DATA FETCHING------
  const data = await getData(params.id);

  //-----OR IN CLIENT SIDE DATA FETCHING-----

  //a) OLD WAY TO FETCH DATA
  // const [data, setData] = useState([]);
  // const [err, setErr] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true);
  //     const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
  //       cache: "no-store",
  //     });
  //     if (!res.ok) {
  //       setErr(true);
  //     }
  //     const data = await res.json()
  //     setData(data);
  //     setIsLoading(false);
  //   };
  //   getData()
  // }, []);

  //b) NEW WAY TO FETCH DATA
  //   const fetcher = (...args) => fetch(...args).then((res) => res.json());
  //   const { data, mutate, error, isLoading } = useSWR( //import useSWR from "swr"; //https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-client-with-third-party-libraries
  //     `/api/posts?username=${session?.data?.user.name}`,
  //     fetcher
  //   );

  return (
    <div className={styles.container}>
      <Image
        src={data.img}
        alt=""
        width={40}
        height={40}
        className={styles.avatar}
      />
    </div>
  );
};

export default BlogPost;
