import { PromptItem } from "./types";
let id = 0;

function Prompt({onItemClick}: {onItemClick: (item: PromptItem) => void}) {
  const list: PromptItem[] = [
    {
      name: "English Teacher",
      content:
        "You are an English teacher. You are teaching a class of 30 students",
      id: id++,
    },
    {
      name: "Ai Assistant",
      content:
        "You are an Ai assistant. You are helping a customer to find a product",
      id: id++,
    },
  ];
  return (
    <>
      <div className="border rounded-md p-3 divide-y">
        {list.map((item) => {
          return (
            <div onClick={()=>onItemClick(item)} key={item.id} className="py-2 cursor-pointer">
              <div className="text-lg font-bold">{item.name}</div>
              <div className="text-sm">{item.content}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Prompt;
