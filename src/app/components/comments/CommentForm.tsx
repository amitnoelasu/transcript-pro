import { Button, Textarea } from "@nextui-org/react";
import { FormEvent, useState } from "react";


interface CommentFormProps {
  handleSubmit: (commentText: string, spanId: string, transcriptId: string, spanText: string) => Promise<void>; // Expect handleSubmit as a function
  spanId: string;
  spanText: string;
  transcriptId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  handleSubmit,
  spanId,
  spanText,
  transcriptId,
}) => {
  {
    const [text, setText] = useState<string>("");
    const isTextareaDisabled = text.length === 0;

    const onSubmit = (event: FormEvent) => {
      event.preventDefault();
      console.log("params", text, spanId, transcriptId, spanText);
      handleSubmit(text, spanId, transcriptId, spanText);
      setText("");
    };

    return (
      <form onSubmit={onSubmit}>
        <div className="grid sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-10">
          <Textarea
            className="col-span-9"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your Comment"
            label={spanText}
            id={spanId}
          />
          <Button className="comment-form-button" disabled={isTextareaDisabled} type="submit">
            Write
          </Button>
        </div>
      </form>
    );
  }
};

export default CommentForm;
