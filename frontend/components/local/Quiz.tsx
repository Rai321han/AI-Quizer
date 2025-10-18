import { QuizType } from "@/app/types/quiz";
// import { QuizOption } from "./QuizOption";
import {
  createContext,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useQuiz } from "@/app/stores/quiz";
import { QuizOption } from "./QuizOption";

// type QuizContextType = {
//   isEditing: boolean;
//   handleQuizChange: <T extends keyof QuizType>(
//     name: T,
//     value: QuizType[T]
//   ) => void;
//   editOption: (no: number, value: string) => void;
//   quizData: QuizType;
//   handleEditToggle: () => void;
//   setQuizData: React.Dispatch<React.SetStateAction<QuizType>>;
// };

// const quizContext = createContext<QuizContextType | null>(null);

// const QuizContainer = ({
//   children,
//   id,
// }: {
//   children: ReactNode;
//   id: number;
// }) => {
//   const quiz = useQuiz((s) => s.quizes.find((q) => q.no === id + 1));
//   const setEditId = useQuiz((state) => state.setEditId);
//   // const updateQuiz = useQuiz((state) => state.updateQuiz);
//   const isEditing = useQuiz((s) => s.onEditId === id + 1);
//   const [quizData, setQuizData] = useState<QuizType>(quiz!);

//   function handleEditToggle() {
//     setEditId(id + 1);
//     // if (isEditing) {
//     //   //   // save the update
//     //   //   updateQuiz(quizData.no, quizData);
//     //   //   // close the edit mode
//     //   setEditId(-1);
//     // }
//     return;
//   }
//   const handleQuizChange = useCallback(
//     <T extends keyof QuizType>(name: T, value: QuizType[T]) => {
//       if (!quiz) return;
//       setQuizData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     },
//     []
//   );

//   function editOption(no: number, value: string) {
//     if (!quizData) return;
//     const updatedOptions = quizData.options.map((o, i) =>
//       i === no ? value : o
//     );
//     handleQuizChange("options", updatedOptions);
//   }
//   if (!quizData) return null;
//   return (
//     <quizContext.Provider
//       value={{
//         isEditing,
//         handleQuizChange,
//         editOption,
//         quizData,
//         handleEditToggle,
//         setQuizData,
//       }}
//     >
//       {children}
//     </quizContext.Provider>
//   );
// };

// const QuizQuestion = ({ children }: { children: ReactNode }) => {
//   const { quizData, isEditing, handleQuizChange, handleEditToggle } =
//     useContext(quizContext)!;
//   return (
//     <div>
//       {/* <div
//         key={quizData.no}
//         className="rounded-md bg-[#dcf8ff] p-5 flex flex-col gap-3"
//       > */}
//       <div className="flex flex-row justify-between gap-2">
//         <div className="flex flex-row grow gap-2">
//           <p>{quizData.no}.</p>
//           <p
//             className={`font-bold text-zinc-700 select-none  ${
//               isEditing ? "hidden" : "block"
//             }`}
//           >
//             {quizData.question}
//           </p>
//           <textarea
//             // type="text"
//             className={`w-full font-bold text-zinc-700 text-wrap border-b-1 border-gray-400 outline-none ${
//               isEditing ? "block" : "hidden"
//             }`}
//             value={quizData.question}
//             onChange={(e) => handleQuizChange("question", e.target.value)}
//           />
//         </div>
//         <div
//           onClick={handleEditToggle}
//           className={`rounded-full w-[40px] h-[40px] aspect-square ${
//             isEditing ? "bg-green-700 animate-pulse" : "bg-[#c0e9f3]"
//           }  flex flex-row items-center justify-center cursor-pointer`}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="20"
//             height="20"
//             viewBox="0 0 24 24"
//             className={`${
//               isEditing ? "hidden" : "block"
//             }   stroke-gray-600 fill-gray-600`}
//             strokeWidth="1"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
//             <path d="m15 5 4 4" />
//           </svg>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             className={`${
//               isEditing ? "block" : "hidden"
//             }   stroke-white fill-none`}
//             stroke="currentColor"
//             strokeWidth="1.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           >
//             <path d="M18 6 7 17l-5-5" />
//             <path d="m22 10-7.5 7.5L13 16" />
//           </svg>
//         </div>
//       </div>
//     </div>
//   );
// };

// const QuizOption = ({ children }: { children: ReactNode }) => {
//   return <div className="flex flex-col gap-2">{children}</div>;
// };

// const Option = ({ children, id }: { children: string; id: number }) => {
//   const { quizData, isEditing, editOption } = useContext(quizContext)!;
//   return (
//     <div className="p-3 bg-white rounded-sm flex flex-row justify-between gap-2 border-1 border-zinc-100">
//       <div className="flex flex-row grow gap-2">
//         <div className="rounded-full w-[30px] h-[30px] bg-zinc-100 p-2 flex flex-row items-center justify-center">
//           <p>{quizData.no}</p>
//         </div>
//         <div className={`select-none ${isEditing ? "hidden" : "block"}`}>
//           {children}
//         </div>
//         <input
//           type="text"
//           className={`w-full ${
//             isEditing ? "block" : "hidden"
//           }  border-b-1 border-gray-400 outline-none `}
//           value={children}
//           onChange={(e) => editOption(id, e.target.value)}
//         />
//       </div>
//       <div>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           className={`${
//             quizData.answers.includes(children)
//               ? "fill-green-300"
//               : "fill-gray-400"
//           } size-6`}
//         >
//           <path
//             fillRule="evenodd"
//             d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </div>
//     </div>
//   );
// };

// export { QuizContainer, QuizQuestion, QuizOption, Option };

export const Quiz = memo(({ id }: { id: number }) => {
  const quiz = useQuiz((s) => s.quizes.find((q) => q.no === id));
  const setEditId = useQuiz((state) => state.setEditId);
  const updateQuiz = useQuiz((state) => state.updateQuiz);
  const isEditing = useQuiz((s) => s.onEditId === id);
  const [quizData, setQuizData] = useState<QuizType>(quiz!);

  function handleEditToggle() {
    if (isEditing) updateQuiz(quizData.no, quizData);
    setEditId(id);
  }

  const handleQuizChange = useCallback(
    <T extends keyof QuizType>(name: T, value: QuizType[T]) => {
      if (!quiz) return;
      setQuizData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  function editOption(no: number, value: string) {
    if (!quizData) return;
    const updatedOptions = quizData.options.map((o, i) =>
      i === no ? value : o
    );
    handleQuizChange("options", updatedOptions);
  }
  if (!quizData) return null;

  return (
    <div
      key={quizData.no}
      className={`rounded-md ${
        isEditing ? "bg-[#b3e5f1] border-1 border-zinc-400" : "bg-[#dcf8ff]"
      }  p-5 flex flex-col gap-3`}
    >
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-row grow gap-2">
          <p>{quizData.no}.</p>
          <p
            className={`font-bold text-zinc-700 select-none  ${
              isEditing ? "hidden" : "block"
            }`}
          >
            {quizData.question}
          </p>
          <textarea
            // type="text"
            className={`w-full font-bold text-zinc-700 text-wrap border-b-1 border-gray-400 outline-none ${
              isEditing ? "block" : "hidden"
            }`}
            value={quizData.question}
            onChange={(e) => handleQuizChange("question", e.target.value)}
          />
        </div>
        <div
          onClick={handleEditToggle}
          className={`rounded-full w-[40px] h-[40px] aspect-square ${
            isEditing ? "bg-green-700 animate-pulse" : "bg-[#c0e9f3]"
          }  flex flex-row items-center justify-center cursor-pointer`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            className={`${
              isEditing ? "hidden" : "block"
            }   stroke-gray-600 fill-gray-600`}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
            <path d="m15 5 4 4" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={`${
              isEditing ? "block" : "hidden"
            }   stroke-white fill-none`}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 7 17l-5-5" />
            <path d="m22 10-7.5 7.5L13 16" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {quizData.options.map((option: string, i: number) => {
          return (
            <QuizOption
              editMode={isEditing}
              key={`${quizData.no}-${i}`}
              no={i + 1}
              option={option}
              editOption={(value: string) => editOption(i, value)}
              answers={quizData.answers}
            />
          );
        })}
      </div>
    </div>
  );
});
