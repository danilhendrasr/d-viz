import Head from "next/head";
import styles from "../styles/Home.module.css";
import { GetServerSideProps } from "next";
import { useState } from "react";

export default function Home({ records }) {
  const [data, setData] = useState(records);

  const tableColumns = [
    { title: "No.", dataIndex: "key", key: "key" },
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch(
    "https://api.airtable.com/v0/appqjyXJh5Z4SOlcL/STATKOM-D?api_key=keyCQJU1TL6nSy9A8"
  );

  const records = (await response.json()).records;

  const filteredRecords = records.map((record, index) => {
    return {
      key: index + 1,
      data: record.fields["Biaya Internet per Bulan"],
    };
  });

  return {
    props: {
      records: filteredRecords,
    },
  };
};
