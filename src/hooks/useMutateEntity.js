export function useMutateEntity() {
  function updateEntity(event, entity) {
    const { value, type, checked, name } = event.target;

    return {
      ...entity,
      [name]: type === "checkbox" ? checked : value,
    };
  }
  return {
    updateEntity,
  };
}
