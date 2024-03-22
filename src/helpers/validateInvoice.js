export const validateInvoice = (invoiceItem) => {
  let errors = { text: false, item: false, hasError: false };
  let errorFieldObj = {};
  // console.log(invoiceItem);
  errors.item = true;
  invoiceItem.items.forEach((item) => {
    if (item.itemname != "") {
      errors.item = false;
    }
  });
  if (invoiceItem.items.length == 1 && invoiceItem.items[0].itemname == "")
    errors.item = true;

  for (let i in invoiceItem.billFrom) {
    errorFieldObj[i] = false;
    if (invoiceItem.billFrom[i] == "") {
      errors.text = true;
      errorFieldObj[i] = true;

      // break;
    }
  }

  for (let i in invoiceItem.billTo) {
    errorFieldObj[i] = false;
    // console.log(i);

    if (invoiceItem.billTo[i] == "") {
      errors.text = true;
      errorFieldObj[i] = true;

      // break;
    }
  }
  if (
    !invoiceItem.date ||
    !invoiceItem.paymentTerms ||
    !invoiceItem.description
  ) {
    errors.text = true;
  }

  errorFieldObj.date = invoiceItem.date ? false : true;
  errorFieldObj.paymentTerms = invoiceItem.paymentTerms ? false : true;
  errorFieldObj.description = invoiceItem.description ? false : true;

  if (errors.text || errors.item) errors.hasError = true;

  return { errors, errorFieldObj };
};

// function determineField(field) {
//   let fieldName;

//   console.log("field", field);

//   switch (field) {
//     case "city":
//       fieldName = "clients_city";
//       break;

//     case "address":
//       fieldName = "clients_address";
//       break;

//     case "postcode":
//       fieldName = "clients_postcode";
//       break;

//     case "country":
//       fieldName = "clients_country";
//       break;
//   }

//   return fieldName;
// }
