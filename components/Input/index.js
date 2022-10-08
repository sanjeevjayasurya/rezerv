import { useCallback } from "react";
function Input(formId, handleChange) {
  const handleInputChange = useCallback(
    (event) => {
      handleChange(event, formId);
    },
    [formId, handleChange]
  );

  return <input handleChange={handleInputChange} />;
}
export default React.memo(Input);
