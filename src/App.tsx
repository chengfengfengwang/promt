import { useState, useEffect, useRef } from "react";
import Prompt from "./prompt";
import { PromptItem } from "./types";
function App() {
  const [promptShow, setPromptShow] = useState(false);
  const ref = useRef<HTMLInputElement|null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {      
      ref.current = e.target as HTMLInputElement;
      if (e.key === "/") {
        setPromptShow(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleItemClick = (item: PromptItem) => {
    console.log("item clicked", item);
    ref.current!.value = item.content;
    ref.current?.focus();
  };
  return (
    <>
      <div className="p-[50px]">
        <input
          className="border border-black rounded-md p-2 w-full"
          type="text"
        />
      </div>
      {promptShow && <Prompt onItemClick={handleItemClick}></Prompt>}
    </>
  );
}

export default App;
