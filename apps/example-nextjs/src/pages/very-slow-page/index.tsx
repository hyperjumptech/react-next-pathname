import { InferGetServerSidePropsType } from "next";
import { delay } from "~/utils/delay";

export default function VerySlowPage({
  message,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-lg font-semibold">Very Slow Page</h1>
      <p>{message}</p>
    </div>
  );
}

export async function getServerSideProps() {
  await delay(5000);

  return {
    props: {
      message: "This content is displayed after a 5000ms delay.",
    },
  };
}
