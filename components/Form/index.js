import { useState } from "react";

export default function Form({onSubmit}) {
  const [formState, setFormState] = useState([
    { address: "", amount: "" },
  ]);

  const handleChange = (event, index) => {
    let formStateCopy = [...formState];
    formStateCopy[index][event.target.name] = event.target.value;
    setFormState(formStateCopy);
  };

  const addRow = () => {
    const newField = { address: "", amount: "" };
    setFormState([...formState, newField]);
  };

  const removeRow = (index) => {
    let formStateCopy = [...formState];
    formStateCopy.splice(index, 1);
    setFormState(formStateCopy);
  };

  return (
    <>
      <div>This is form</div>
      <div>
        <form
          id="address-form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit()
          }}
        >
          {formState.map((state, index) => (
            <div key={index}>
              <input
                name="address"
                type="text"
                value={state.address}
                onChange={(event) => handleChange(event, index)}
              />
              <span style={{ marginLeft: "20px" }} />
              <input
                name="amount"
                type="text"
                value={state.amount}
                onChange={(event) => handleChange(event, index)}
              />
              <span style={{ marginLeft: "20px" }} />
              <button onClick={() => removeRow(index)}>Remove row</button>
              <br />
            </div>
          ))}
        </form>
        <input type="submit" value="Submit" form="address-form"></input>
        <button onClick={addRow}> Add row </button>
      </div>
    </>
  );
}
