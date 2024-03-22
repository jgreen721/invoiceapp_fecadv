export const validateLSDraft = (draft) => {
  let hasVal = false;
  for (let i in draft.billFrom) {
    if (draft?.billFrom[i] != null) {
      hasVal = true;
      return true;
    }
  }

  for (let i in draft.billTo) {
    if (draft.billTo[i] != null) {
      hasVal = true;
      return true;
    }
  }

  if (draft.date != null) return true;
  if (draft.description != null) return true;
  if (draft.paymentTerms != null) return true;

  draft.items.forEach((item) => {
    if (item.itemname != "") {
      hasVal = true;
      return true;
    }
  });
  console.log("validateLS", hasVal);
  return hasVal;
};
