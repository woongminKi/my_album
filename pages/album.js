import { useEffect } from "react";
import useStore from "../lib/Store";
import HeadInfo from "../components/HeadInfo";

export default function Album({ recivedList, resImage }) {
  const { list, updateList } = useStore();
  const albumList = [...list];

  useEffect(() => {
    updateList(recivedList);
  }, [recivedList]);

  return (
    <div>
      <HeadInfo title="Get Album List" keyword="Album List" contents="Album List" />
      <h1>Album</h1>
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
