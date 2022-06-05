import { useState, useEffect } from "react";
import Image from "next/image";
import useStore from "../lib/Store";
import albumBox from "../styles/AlbumBox.module.css";

export default function AlbumBox({ id, title }) {
  const { list, updateList } = useStore();
  const [text, setText] = useState("");
  const [isClickedUpdate, setIsClickedUpdate] = useState(false);
  const [isClickedDelete, setIsClickedDelete] = useState(false);

  useEffect(() => {
    updateList(list);
  }, [isClickedUpdate, isClickedDelete]);

  const handleUpdate = (e) => {
    setText(e.target.value);
  };

  const handleUpdateButton = () => {
    setIsClickedUpdate(true);
  };

  const handleSubmitButton = (e) => {
    const targetElement = list.find((item) => item.id === Number(e.target.id));
    targetElement.title = text;
    setIsClickedUpdate(false);
  };

  const handleDeleteButton = (e) => {
    setIsClickedDelete(current => !current);

    const targetElement = list.find((item) => item.id === Number(e.target.id));
    const targetIndex = list.indexOf(targetElement);
    list.splice(targetIndex, 1);
  };

  return (
    <>
      <div className={albumBox.images}>
        <Image src={"https://place-hold.it/500.jpg"} alt="Image" width={100} height={100} />
      </div>
      <div>{title}</div>

      {isClickedUpdate ?
        <>
          <input className={albumBox.inputBox} type="text" value={text} onChange={handleUpdate} placeholder="Write new comments" />
          <button className={albumBox.button} id={id} onClick={handleSubmitButton}>Submit</button>
        </>
      :
        <button className={albumBox.button} onClick={handleUpdateButton}>Update</button>
      }
      <button className={albumBox.button} id={id} onClick={handleDeleteButton}>Delete</button>
    </>
  );
}
