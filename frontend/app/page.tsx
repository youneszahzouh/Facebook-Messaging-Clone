import Image from "next/image";
import ConversationsListClientSide from "./components/conversations-list/ConversationsListClientSide";
import ConversationsList from "./components/conversations-list/ConversationsList";

export default function Home() {
  return (
    <main className="grid grid-cols-5 min-h-[100dvh] bg-gray-800 ">
      <aside>
        <ConversationsList />
      </aside>

      <section className="col-span-3 border-x border-gray-700"></section>

      <aside></aside>
    </main>
  );
}
