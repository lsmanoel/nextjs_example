import { NextPage } from "next";
import { CodeBlock, dracula } from "react-code-blocks";
import Head from "next/head";
import styles from "styles/pages/Page.module.scss";
import { useEffect, useState } from "react";

const CICD: NextPage = () => {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  fetch(
    "https://raw.githubusercontent.com/lsmanoel/nextjs_example/main/.github/workflows/github-actions-CI.yml"
  ).then((r) => {
    r.text().then((d) => setCode(d));
  });

  useEffect(() => {
    code != "" && setLoading(false);
  }, [code]);

  return (
    <>
      <Head>
        <title>Lucas | CI/CD</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.lightBox}>
            <h1> CI/CD </h1>
          </div>

          {!loading && (
            <div className={styles.CodeBlock}>
              <CodeBlock
                text={code}
                language="yml"
                showLineNumbers={true}
                theme={dracula}
                customStyle={{
                  background: "none",
                }}
              />
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default CICD;
