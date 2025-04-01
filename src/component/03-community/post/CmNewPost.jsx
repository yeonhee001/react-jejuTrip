import React from 'react'
import { Controller, useFormContext } from "react-hook-form";
// import InputField from "./InputField";

function CmNewPost() {
  const {control, setFocus} = useFormContext();

  return (
    <Controller
    name="title"
    control={control}
    rules={{
      validate: (data) => {
        if(!data || data.length <= 0){
          return '제목을 작성해주세요.'
        }
        return true;
      },
    }}
    render={({field: { onChange, value }, fieldState: { error }}) => (
      <InputField
      autoFocus
      label="제목"
      placeholder="제목을 작성해주세요."
      returnKeyType="next"
      value={value ?? ""}
      onChangeText={onChange}
      onSubmitEditing={() => setFocus("description")}
      error={error?.message}
      />
    )}
    />
  );
}

export default CmNewPost