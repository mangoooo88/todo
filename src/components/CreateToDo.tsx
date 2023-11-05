import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState)
  const category = useRecoilValue(categoryState)
  const {
    register,
    handleSubmit,
    setValue
  } = useForm<IForm>()
  const onSubmit = ({toDo}: IForm) => {
    setToDos(prev => {
      return [{text: toDo, id: Date.now(), category : category}, ...prev]
    })
    setValue("toDo", '')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("toDo", {
        required: true
      })} type="text" placeholder="투두 작성"/>
      <button type="submit">작성</button>
    </form>

  );
}

export default CreateToDo;