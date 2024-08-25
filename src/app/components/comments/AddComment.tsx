import { Button, Textarea } from "@nextui-org/react";
import { useState } from "react";

export default function AddComment({spanId, spanText}: {spanId: string, spanText: string}) {
    const [commentAdded, setCommentAdded] = useState<boolean>(false);
    function persistComment() {
        
    }

    function deleteComment() {

    }
  return (
    <div className="grid sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-10">
      <Textarea className="col-span-9" placeholder="Enter your Comment" label={spanText} id={spanId}></Textarea>
      <div className="col-span-1">
        <Button onClick={persistComment}>Add</Button>
        <Button onClick={deleteComment}>Delete</Button>
      </div>
      
    </div>
  );
}
