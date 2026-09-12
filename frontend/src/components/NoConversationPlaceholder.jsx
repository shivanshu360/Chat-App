import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4">
        <MessageCircleIcon className="w-8 h-8 text-cyan-400" />
      </div>
      <h3 className="text-2xl font-bold text-slate-200 mb-2">Select a conversation</h3>
      <p className="text-slate-400 text-sm max-w-md">
        Choose a contact from the sidebar to start chatting or continue a previous conversation.
      </p>
    </div>
  );
};

export default NoConversationPlaceholder;
