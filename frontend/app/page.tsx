import Image from "next/image";
import ConversationsListClientSide from "./components/conversations-list/ConversationsListClientSide";
import ConversationsList from "./components/conversations-list/ConversationsList";

export default function Home() {
  return (
    <main className="grid grid-cols-5 min-h-[100dvh] ">
      <aside className="bg-gray-800">
        <ConversationsList />
      </aside>

      <section className="col-span-3 bg-gray-500"></section>

      <aside className="bg-gray-800"></aside>
    </main>
  );
}
