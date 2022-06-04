import Head from "next/head";

export default function HeadInfo({ title, keyword, contents }) {
  return (
    <Head>
      <title>{title}</title>
      <meta keyword={keyword}></meta>
      <meta contents={contents}></meta>
    </Head>
  );
};

HeadInfo.defaultProps = {
  title: "FreedSoft Assignment",
  keyword: "FreedSoft Assignment",
  contents: "FreedSoft Assignment made by Ki Woong Min"
};
