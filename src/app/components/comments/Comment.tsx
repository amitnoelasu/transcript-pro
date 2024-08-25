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
    <small className="" style={{
    backgroundColor: '#6b46c1',
    borderRadius: '8px', // Adjust the radius as needed
    padding: '2px 4px',  // Optional: add padding to make the rounded corners more visible
    color: '#fff'        // Optional: set text color for better contrast
  }}>{spanText}</small>
        {/* <h3 className="text-lg font-semibold mb-2">Comment ID: {spanId}</h3> */}
        <p className=" mb-2">{commentText}</p>
        
      </div>
    )
}