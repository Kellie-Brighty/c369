import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export interface WhizparPost {
  id: string;
  author: string;
  text: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  createdAt: Timestamp;
  likes: string[];
  comments: {
    id: string;
    author: string;
    text: string;
    createdAt: Timestamp;
    likes: string[];
  }[];
}

const compressVideo = async (file: File) => {
  if (!file.type.includes("video")) return file;

  const ffmpeg = new FFmpeg();
  await ffmpeg.load();

  await ffmpeg.writeFile(file.name, await fetchFile(file));
  await ffmpeg.exec([
    "-i",
    file.name,
    "-c:v",
    "libx264",
    "-crf",
    "28",
    "-preset",
    "veryfast",
    "-c:a",
    "aac",
    "output.mp4",
  ]);

  const data = await ffmpeg.readFile("output.mp4");
  return new File([data], "compressed.mp4", { type: "video/mp4" });
};

const uploadToCloudinary = async (file: File) => {
  const processedFile = await compressVideo(file);
  const formData = new FormData();
  formData.append("file", processedFile);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return {
    url: data.secure_url,
    type: data.resource_type === "image" ? "image" : "video",
  };
};

export const createPost = async (text: string, mediaFile?: File) => {
  let mediaUrl = "";
  let mediaType: "image" | "video" | undefined;

  if (mediaFile) {
    const uploadResult = await uploadToCloudinary(mediaFile);
    mediaUrl = uploadResult.url;
    mediaType = uploadResult.type === "image" ? "image" : "video";
  }

  const post = {
    author: `Anonymous_${Math.floor(Math.random() * 10000)}`,
    text,
    mediaUrl,
    mediaType,
    createdAt: Timestamp.now(),
    likes: [],
    comments: [],
  };

  return addDoc(collection(db, "whizpar_posts"), post);
};

export const subscribeToPosts = (callback: (posts: WhizparPost[]) => void) => {
  const q = query(
    collection(db, "whizpar_posts"),
    orderBy("createdAt", "desc")
  );
  return onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as WhizparPost[];
    callback(posts);
  });
};

export const toggleLike = async (postId: string, userId: string) => {
  const postRef = doc(db, "whizpar_posts", postId);
  await updateDoc(postRef, {
    likes: arrayUnion(userId),
  });
};

export const addComment = async (postId: string, text: string) => {
  const postRef = doc(db, "whizpar_posts", postId);
  const comment = {
    id: Date.now().toString(),
    author: `Anonymous_${Math.floor(Math.random() * 10000)}`,
    text,
    createdAt: Timestamp.now(),
    likes: [],
  };

  await updateDoc(postRef, {
    comments: arrayUnion(comment),
  });
};
