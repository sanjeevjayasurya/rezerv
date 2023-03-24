import { ethers } from "ethers";
import { useFieldArray, useForm } from "react-hook-form";
import { object, array, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const isObjectEmpty = (objectName) => {
  console.log(objectName);
  return JSON.stringify(objectName) === "{}";
};

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

  const showModal = () => {
    console.log("showModal");
  };

  return (
    <div className="w-full mx-auto flex flex-col mt-10">
      <form
        className="mx-auto"
        id="address-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {fields.map((field, index) => (
          <div className="relative flex" key={field.id}>
            <div style={{ padding: "1rem" }} class="nes-field is-inline">
              <input
                type="text"
                id="dark_field"
                class="nes-input is-dark"
                placeholder={`Recipient ${index + 1}`}
                {...register(`formData.${index}.address`)}
              />
            </div>
            <div style={{ padding: "1rem" }} class="nes-field is-inline">
              <input
                type="text"
                id="dark_field"
                class="nes-input is-dark"
                placeholder="Amount"
                {...register(`formData.${index}.amount`)}
              />
            </div>
            <span style={{ marginLeft: "20px" }} />
            <button
              className="text-yellow text-4xl"
              onClick={() => removeRow(index)}
            >
              -
            </button>
            <br />
          </div>
        ))}
      </form>
      {/* <input
        className={`nes-btn ${
          isObjectEmpty(errors) ? "is-disabled" : "is-success"
        }`}
        type="submit"
        value="Submit"
        disabled={isObjectEmpty(errors)}
        form="address-form"
      ></input> */}
      <div className="flex mx-auto mt-10">
        <input
          type="submit"
          value="Review"
          form="address-form"
          className="nes-btn mr-4"
        ></input>
        <button className="nes-btn ml-4" onClick={addRow}>
          Add recipient
        </button>
      </div>
    </div>
  );
}
