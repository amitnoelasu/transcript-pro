import { Button } from '@nextui-org/react'; // Import Button from NextUI or any other library you are using
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
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
      className="p-4 mb-4 border rounded-lg shadow-md flex items-start space-x-2"
      onMouseEnter={() => onHover(spanId)}
      onMouseLeave={onLeave}
    >
      <div className="flex-1 flex flex-col space-y-2"> {/* Added wrapper for vertical stacking */}
        <div>
        <small
          style={{
            backgroundColor: "#6b46c1",
            borderRadius: "8px", // Adjust the radius as needed
            padding: "2px 4px", // Optional: add padding to make the rounded corners more visible
            color: "#fff", // Optional: set text color for better contrast
            display: "inline-block"
          }}
        >
          {spanText}
        </small>
        </div>
        <p className="mb-2">{commentText}</p>
        
      </div>
      <div className="flex flex-col space-y-2">
        <Button onClick={handleEdit} className="comment-edit-button p-2" isIconOnly>
          <PencilIcon />
        </Button>
        <Button onClick={handleDelete} className="comment-edit-button p-2" isIconOnly>
          <TrashIcon />
        </Button>
      </div>
      
    </div>
  );
  
}
