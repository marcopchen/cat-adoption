import React from 'react';

interface PostFormProps {
  changeField: (event: { target: { name: string, value: string } }) => void;
  submitPost: () => void;
  name: string;
  age: string;
  breed: string;
  favorite: string;
  disposition: string;
};

const PostPage: React.FC<PostFormProps> = (props) => {
  return (
    <div>
      <form onSubmit={props.submitPost}>
        <label>{'Name: '}</label>
        <input type='text' name='name' value={props.name} onChange={props.changeField} />
        <br />
        <label>{'Age: '}</label>
        <input type='number' name='age' value={props.age} onChange={props.changeField} />
        <br />
        <label>{'Disposition: '}</label>
        <input type='text' name='disposition' value={props.disposition} onChange={props.changeField} />
        <br />
        <label>{'Breed Type: '}</label>
        <input type='text' name='breed' value={props.breed} onChange={props.changeField} />
        <br />
        <label>{'Favorite Treat: '}</label>
        <input type='text' name='favorite' value={props.favorite} onChange={props.changeField} />
      </form>
      <button
        aria-label={'submit form to add new cat adoption post'}
        onClick={props.submitPost}
      >
        {'Submit Post'}
      </button>
    </div>
  );
}

export default PostPage;
