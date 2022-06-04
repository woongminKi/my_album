import { useEffect, useState } from "react";
import useStore from "../lib/Store";
import HeadInfo from "../components/HeadInfo";
import AlbumBox from "../components/AlbumBox";

export default function Album({ recivedList }) {
  const [text, setText] = useState("");
  const { list, updateList } = useStore();

  useEffect(() => {
    updateList(recivedList);
  }, [recivedList]);

  const handleCreate = (e) => {
    setText(e.target.value)
  };

  const handleClick = (e) => {
    list.unshift({
      userId: list.length + 1,
      id: list.length + 1,
      title: text,
    });

    setText("");
  };

  return (
    <div>
      <HeadInfo title="Get Album List" keyword="Album List" contents="Album List" />
      <h1>Album</h1>
      <input type="text" name="text" value={text} onChange={handleCreate} placeholder="Write your comment" />
      <button onClick={handleClick}>Create</button>

      {list.map((item) => (
        <div key={item.id}>
          <AlbumBox userId={item.userId} id={item.id} title={item.title} />
        </div>
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/albums');
  const recivedList = await res.json();

  if (!res) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      recivedList,
    },
    revalidate: 20,
  };
};
