import { InferGetServerSidePropsType } from "next";
import { delay } from "~/utils/delay";

export default function SlowPage({
  message,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-lg font-semibold">Slow Page</h1>
      <p>{message}</p>
    </div>
  );
}

export async function getServerSideProps() {
  await delay(2000);

  return {
    props: {
      message: "This content is displayed after a 2000ms delay.",
    },
  };
}
