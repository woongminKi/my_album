import Image from "next/image";

export default function AlbumBox({ userId, id, title }) {
  return (
    <>
      <div>
        <Image src={"https://place-hold.it/500.jpg"} alt="Image" width="50" height="50" />
      </div>
      <div>{title}</div>
      <button>Update</button>
      <button>Delete</button>
    </>
  );
}
