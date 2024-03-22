export const serializeFormData = (formData, itemIds) => {
  let serializedInvoice = {
    billFrom: {
      address: formData.get("address"),
      city: formData.get("city"),
      postcode: formData.get("postcode"),
      country: formData.get("country"),
    },
    billTo: {
      clientsname: formData.get("clientsname"),
      email: formData.get("email"),
      clients_city: formData.get("clients_city"),
      clients_address: formData.get("clients_address"),
      clients_postcode: formData.get("clients_postcode"),
      clients_country: formData.get("clients_country"),
    },
    description: formData.get("description"),
    paymentTerms: formData.get("paymentTerms"),
    date: JSON.parse(formData.get("date")),
    itemnames: formData.getAll("itemName"),
    prices: formData.getAll("price"),
    quantities: formData.getAll("quantity"),
    ids: formData.getAll("id"),
  };
  let items = [];
  // console.log(serializedInvoice, "ItemIDs(FormErrorsItems) --", itemIds);
  serializedInvoice.itemnames.forEach((itemname, idx) => {
    // if (itemname != "") {
    let item = {
      id: serializedInvoice.ids[idx],
      itemname: itemname,
      price: serializedInvoice.prices[idx],
      quantity: serializedInvoice.quantities[idx],
    };
    items.push(item);
    // }
  });

  delete serializedInvoice.itemnames;
  delete serializedInvoice.prices;
  delete serializedInvoice.quantities;
  delete serializedInvoice.ids;
  serializedInvoice.items = items;
  // console.log(serializedInvoice);
  return serializedInvoice;
};
