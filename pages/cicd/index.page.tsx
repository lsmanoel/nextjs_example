import { NextPage } from "next";
import { CodeBlock, dracula } from "react-code-blocks";
import Head from "next/head";
import styles from "styles/pages/Page.module.scss";
import { useEffect, useState } from "react";
import { BuildStatusBadge } from "react-build-status-badge";

const CICD: NextPage = () => {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/lsmanoel/nextjs_example/main/.github/workflows/github-actions-CI.yml"
    ).then((r) => {
      r.text().then((d) => setCode(d));
    });
  }, []);

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

          <div>
            <h2>Pipeline</h2>
            <ul>
              <li>
                <p>
                  1. Teste com{" "}
                  <a href="https://github.com/bats-core/bats-core#readme">
                    Bats
                  </a>
                  .
                </p>
              </li>
              <li>
                <p>2. Build do projeto.</p>
              </li>
              <li>
                <p>3. Testes unitário.</p>
              </li>
            </ul>
            {!loading && (
              <div className={styles.CodeBlock}>
                <div>
                  <a href="https://github.com/lsmanoel/nextjs_example/blob/main/.github/workflows/github-actions-CI.yml">
                    .github/workflows/github-actions-CI.yml
                  </a>
                  <BuildStatusBadge>
                    [![github-actions-ci](https://github.com/lsmanoel/curriculum/actions/workflows/github-actions-CI.yml/badge.svg)](https://github.com/lsmanoel/curriculum/actions/workflows/github-actions-CI.yml)
                  </BuildStatusBadge>
                </div>
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
          </div>
        </main>
      </div>
    </>
  );
};

export default CICD;
