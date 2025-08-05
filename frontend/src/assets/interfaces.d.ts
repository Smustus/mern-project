interface Post {
  _id: string;
  title: string;
  slug: string;
  published?: boolean;
  author?: string;
  content: string;
  tags?: string[];
  comments?: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

interface Comment {
  _id?: string;
  user: string;
  content: string;
  createdAt?: string;
}
