import React from 'react';

interface PostDetailsProps {
  submitPost: () => void;
  name: string;
  age: string;
  breed: string;
  favorite: string;
  disposition: string;
};

const PostPage: React.FC<PostDetailsProps> = (props) => {
  return (
    <div>
      <p>{'Age: ' + props.age + ' year(s) old'}</p>
      <p>{'Disposition: ' + props.disposition}</p>
      <p>{'Breed Type: ' + props.breed}</p>
      <p>{'Favorite Treat: ' + props.favorite}</p>
      <button
        aria-label={'open form to edit cat adoption post'}
        onClick={props.submitPost}
      >
        {'Edit Post'}
      </button>
    </div>
  );
}

export default PostPage;
