interface ShareButtonProps {
  showShareableCard: boolean;
  handleShare: () => void;
}

export default function ShareButton({
  showShareableCard,
  handleShare,
}: ShareButtonProps) {
  return (
    <button
      onClick={handleShare}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {showShareableCard ? "Share Match Card" : "Show Match Card"}
    </button>
  );
}
