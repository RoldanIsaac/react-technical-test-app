export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface PostFormValues {
  title: string;
  body: string;
}

export interface NewPostInput extends PostFormValues {
  userId: number;
}
