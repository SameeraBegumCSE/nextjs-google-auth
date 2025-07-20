"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);

        if (!response.ok) throw new Error("Failed to fetch prompts");

        const data = await response.json();
        setMyPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Delete request failed");

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);
        setMyPosts(filteredPosts);
      } catch (error) {
        console.error("Failed to delete prompt:", error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
