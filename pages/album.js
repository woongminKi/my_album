import { useState, useEffect } from "react";

import useStore from "../lib/Store";
import HeadInfo from "../components/HeadInfo";
import AlbumBox from "../components/AlbumBox";
import albumStyles from "../styles/Album.module.css";

export default function Album({ recivedList }) {
  const { list, updateList } = useStore();
  const [text, setText] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const numPages = Math.ceil(list.length / limit);

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
      <h1 className={albumStyles.h1}>Album</h1>

      <input className={albumStyles.inputBox} type="text" value={text} onChange={handleCreate} placeholder="Write your comments" />
      <button className={albumStyles.button} onClick={handleCreateButton}>Create</button>

      {list.slice(offset, offset + limit).map((item) => (
        <div className={albumStyles.title} key={item.id}>
          <AlbumBox id={item.id} title={item.title} />
        </div>
      ))}

      <button className={albumStyles.pagiNationButton} onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
      <button className={albumStyles.pagiNationButton} onClick={() => setPage(page + 1)} disabled={page === numPages}>Next</button>
    </div>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL);
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
