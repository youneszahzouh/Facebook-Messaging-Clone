/*
  Warnings:

  - You are about to drop the `MessagesOnConversations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `conversationId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MessagesOnConversations" DROP CONSTRAINT "MessagesOnConversations_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "MessagesOnConversations" DROP CONSTRAINT "MessagesOnConversations_messageId_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "conversationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "MessagesOnConversations";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
