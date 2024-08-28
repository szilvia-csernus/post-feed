import PostForm from '@/components/post-form';
import { createPost } from '@/actions/post-actions';


export default function NewPostPage() {
  return <PostForm action={createPost} />;
}
