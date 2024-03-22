export const validateItems = (items) => {
  let itemErrors = [];
  items.forEach((item, idx) => {
    // console.log(item);
    if (item.itemname == "") {
      itemErrors.push({ id: item.id, hasError: true });
    } else {
      itemErrors.push({ id: item.id, hasError: false });
    }
  });

  return { itemErrors };
};
