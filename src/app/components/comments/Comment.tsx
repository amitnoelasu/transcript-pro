interface CommentProps {
    spanId: string;
    commentText: string;
    spanText: string;
    onHover: (spanId: string) => void;
    onLeave: () => void;
  }
  
export default function Comment({ spanId, commentText, spanText, onHover, onLeave }: CommentProps) {
    return (
        <div
      className="p-4 mb-4 border rounded-lg shadow-md"
      onMouseEnter={() => onHover(spanId)}
      onMouseLeave={onLeave}
    >
        <h3 className="text-lg font-semibold mb-2">Comment ID: {spanId}</h3>
        <p className=" mb-2">{commentText}</p>
        <small className="">Span Text: {spanText}</small>
      </div>
    )
}