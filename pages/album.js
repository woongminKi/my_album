import { useState, useEffect } from "react";
import useStore from "../lib/Store";
import HeadInfo from "../components/HeadInfo";
import AlbumBox from "../components/AlbumBox";
import album from "../styles/Album.module.css";

export default function Album({ recivedList }) {
  const { list, updateList } = useStore();
  const [text, setText] = useState("");

  useEffect(() => {
    updateList(recivedList);
  }, [recivedList]);

  const handleCreate = (e) => {
    setText(e.target.value);
  };

  const handleCreateButton = () => {
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

      <input className={album.inputBox} type="text" value={text} onChange={handleCreate} placeholder="Write your comments" />
      <button className={album.button} onClick={handleCreateButton}>Create</button>

      {list.map((item) => (
        <div className={album.title} key={item.id}>
          <AlbumBox id={item.id} title={item.title} />
        </div>
      ))}
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/albums");
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
