import { useState, useEffect } from "react";
import Image from "next/image";
import useStore from "../lib/Store";

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
      <div>
        <Image src={"https://place-hold.it/500.jpg"} alt="Image" width="50" height="50" />
      </div>
      <div>{title}</div>

      {isClickedUpdate ?
        <>
          <input type="text" value={text} onChange={handleUpdate} placeholder="Write new comments" />
          <button id={id} onClick={handleSubmitButton}>Submit</button>
        </>
      :
        <button onClick={handleUpdateButton}>Update</button>
      }
      <button id={id} onClick={handleDeleteButton}>Delete</button>
    </>
  );
}
