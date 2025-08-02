interface Comment {
  user: string;
  content: string;
  votes: number;
}

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
