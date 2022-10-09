import { ethers } from "ethers";
import { useFieldArray, useForm } from "react-hook-form";
import { object, array, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Form({ onSubmit }) {
  const validationSchema = object().shape({
    formData: array()
      .of(
        object().shape({
          address: string().required("Address is required"),
          amount: string().required("Please enter the amount"),
        })
      )
      .min(2, "You need to enter atleast two addresses")
      .required("Please enter address to move ahead"),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // mode: "onBlur",
    defaultValues: {
      formData: [{ address: "", amount: "" }],
    },
    resolver: yupResolver(validationSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "formData",
  });

  const addRow = () => {
    const newField = { address: "", amount: "" };
    append(newField);
  };

  const removeRow = (index) => {
    remove(index);
  };

  return (
    <>
      <form id="address-form" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input {...register(`formData.${index}.address`)} />
            <span style={{ marginLeft: "20px" }} />
            <input
              {...register(`formData.${index}.amount`)}
            />
            <span style={{ marginLeft: "20px" }} />
            <button onClick={() => removeRow(index)}>Remove row</button>
            <br />
          </div>
        ))}
      </form>
      <input type="submit" value="Submit" form="address-form"></input>
      <button onClick={addRow}> Add row </button>
    </>
  );
}
