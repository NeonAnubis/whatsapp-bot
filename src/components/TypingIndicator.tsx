const TypingIndicator = () => {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-whatsapp-msg-received text-white rounded-lg px-4 py-3 max-w-[70%]">
        <div className="flex items-center gap-1">
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
