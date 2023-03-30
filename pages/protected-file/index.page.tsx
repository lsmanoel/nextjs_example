import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import styles from "styles/pages/Page.module.scss";
import Head from "next/head";
import { getSession, useSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/protected",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

const ProtectedFile: NextPage = () => {
  const { data: session } = useSession();
  const [name, setName] = useState<string>("");

  useEffect(() => {
    session?.user?.name && setName(session.user.name);
  }, [session]);

  return (
    <>
      <Head>
        <title>Lucas | Arquivo Protegido</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.lightBox}>
            <h1> Arquivo Protegido </h1>
          </div>

          <div className={styles.column}>
            <h2>Sobre o documento protegido</h2>
            <h3>Olá {name}. Você recebeu acesso ao conteúdo protegido</h3>
            <h3>
              Uma vez que esse site foi implementado com o framework{" "}
              <a href="https://nextjs.org/" target="_blank">
                NextJs
              </a>{" "}
              ele possui o recurso que possibilita a renderização da página no
              lado do servidor, e assim enviar para o navegador uma página
              estática. O nome desse recurso é{" "}
              <a
                href="https://www.adservio.fr/post/server-side-rendering-advantages#:~:text=With%20server%2Dside%20rendering%2C%20even,data%20privacy%20and%20ensuring%20compliance."
                target="_blank"
              >
                ServerSideRendering
              </a>
              . Logo sem a efetuação do Login esse conteúdo jamais seria mandado
              para o navegador do cliente. Essa página serve como demonstração
              desse recurso. Como você efetuou o login, você recebeu acesso ao
              conteúdo secreto e protegido:
            </h3>
          </div>
          <div>
            <h2>Receita de Miojo</h2>
            <ul>
              <li>
                <p>1. Coloque o fogo para ferver.</p>
              </li>
              <li>
                <p>2. Em seguida coloque as 4 colheres de catchup e mexa.</p>
              </li>
              <li>
                <p>3. Depois quando a água estiver fervendo ponhe o miojo.</p>
              </li>
              <li>
                <p>4. Em seguida coloque o tempero e as colheres de pimenta.</p>
              </li>
              <li>
                <p>5. Depois rale a mussarela em cima do miojo.</p>
              </li>
              <li>
                <p>6. Bom apetite!</p>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProtectedFile;
