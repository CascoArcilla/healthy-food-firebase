import type { Timestamp } from "firebase-admin/firestore";

export type PostUser = {
  uid: string;
  email?: string;
  displayName?: string;
  phoneNumber?: string;
  photoURL?: string;
};

export type Post = {
  title: string;
  description: string;
  price: number;
};

export type FirestorePost = Post & {
  image: string;
  user: PostUser;
  createdAt: Timestamp;
};
