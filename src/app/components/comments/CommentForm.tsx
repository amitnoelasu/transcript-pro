import { Button, Textarea } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
interface CommentFormProps {
  handleSubmit: (commentText: string, spanId: string, transcriptId: string, spanText: string) => Promise<void>; // Expect handleSubmit as a function
  spanId: string;
  spanText: string;
  transcriptId: string;
  closeTextArea: () => void;
  initialValue: string;
}

const CommentForm: React.FC<CommentFormProps> = ({
  handleSubmit,
  spanId,
  spanText,
  transcriptId,
  closeTextArea,
  initialValue = ""
}) => {
  {
    const [text, setText] = useState<string>(initialValue);
    const isTextareaDisabled = text.length === 0;

    const onSubmit = (event: FormEvent) => {
      event.preventDefault();
      console.log("params", text, spanId, transcriptId, spanText);
      handleSubmit(text, spanId, transcriptId, spanText);
      setText("");
    };

    return (
      <form onSubmit={onSubmit}>
        <div className="dark flex items-start space-x-2">
          <Textarea
            className="flex-1"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your Comment"
            label={spanText}
            id={spanId}
          />
          <div className="flex flex-col space-y-2">
            <Button 
              className="comment-form-button p-2" 
              disabled={isTextareaDisabled} 
              type="submit"
              isIconOnly 
              // style={{padding:4}}
            >
              <PaperAirplaneIcon className="text-white"/>
            </Button>
            <Button 
              className="comment-form-button p-2" 
              onClick={closeTextArea}
              isIconOnly
              style={{marginTop:18}}
            >
              <XMarkIcon className="text-white"/>
            </Button>
          </div>
        </div>
      </form>
    );
  }
};

export default CommentForm;
