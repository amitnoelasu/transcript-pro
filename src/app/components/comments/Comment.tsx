import { Button } from '@nextui-org/react'; // Import Button from NextUI or any other library you are using

interface CommentProps {
  spanId: string;
  commentText: string;
  spanText: string;
  onHover: (spanId: string) => void;
  onLeave: () => void;
  onEdit: (commentText: string, spanText: string, spanId: string) => void; // Add onEdit prop
  onDelete: (commentText: string, spanText: string, spanId: string) => void;
}

export default function Comment({
  spanId,
  commentText,
  spanText,
  onHover,
  onLeave,
  onEdit, // Add onEdit prop
  onDelete,
}: CommentProps) {
  const handleEdit = () => {
    onEdit(commentText, spanText, spanId); // Call onEdit when the button is clicked
  };

  const handleDelete = () => {
    onDelete(commentText, spanText, spanId);
  }

  return (
    <div
      className="p-4 mb-4 border rounded-lg shadow-md"
      onMouseEnter={() => onHover(spanId)}
      onMouseLeave={onLeave}
    >
      <small
        className=""
        style={{
          backgroundColor: "#6b46c1",
          borderRadius: "8px", // Adjust the radius as needed
          padding: "2px 4px", // Optional: add padding to make the rounded corners more visible
          color: "#fff", // Optional: set text color for better contrast
        }}
      >
        {spanText}
      </small>
      <p className="mb-2">{commentText}</p>
      <Button onClick={handleEdit} className="comment-edit-button">
        Edit
      </Button>
      <Button onClick={handleDelete} className="comment-edit-button">
        Delete
      </Button>
    </div>
  );
}
