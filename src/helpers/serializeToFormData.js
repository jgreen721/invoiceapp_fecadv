export const serializeToFormData = (invoice) => {
  console.log("serializeToFormData", invoice);
  let formData = {};
  formData.id = invoice.id;
  formData.description = invoice.description;
  // formData.clientemail = invoice.clientEmail;
  // formData.clientname = invoice.clientName;

  formData.address = invoice.senderAddress.street;
  formData.city = invoice.senderAddress.city;
  formData.postcode = invoice.senderAddress.postCode;
  formData.country = invoice.senderAddress.country;

  formData.clientsname = invoice.clientName;
  formData.email = invoice.clientEmail;

  formData.clients_city = invoice.clientAddress.city;
  formData.clients_postcode = invoice.clientAddress.postCode;
  formData.clients_country = invoice.clientAddress.country;
  formData.clients_address = invoice.clientAddress.street;
  formData.paymentTerms = invoice.paymentTerms;
  formData.date = invoice.date;

  console.log(formData);

  return formData;
};
