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
    <div class="w-full mx-auto flex flex-col mt-10">
      <form class="mx-auto" id="address-form" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div class="reltaive" key={field.id}>
            <input
              class="h-10 p-4 border-[2px] w-72 border-black bg-slate-700 focus:border-yellow focus:bg-slate-600 outline-none"
              placeholder={`Recipient ${index + 1}`}
              {...register(`formData.${index}.address`)}
            />
            <span style={{ marginLeft: "20px" }} />
            <input
              class="h-10 p-4 border-[2px] w-72 border-black bg-slate-700 focus:border-yellow focus:bg-slate-600 outline-none"
              placeholder="Amount"
              {...register(`formData.${index}.amount`)}
            />
            <span style={{ marginLeft: "20px" }} />
            <button class="text-yellow text-4xl" onClick={() => removeRow(index)}>-</button>
            <br />
          </div>
        ))}
      </form>
      <input type="submit" value="Submit" form="address-form"></input>
      <button class="text-yellow" onClick={addRow}> Add recipient </button>
    </div>
  );
}
