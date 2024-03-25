export const serializeToInvoiceItem = (item, invoiceStatus) => {
  console.log("serializeToInvoiceItem", item);
  let formattedInvoiceItem = {};

  formattedInvoiceItem.paymentDue = `${item.date.year}-${item.date.month}-${item.date.day}`;
  let curMonth = new Date().getMonth();
  let curDay = new Date().getDate();
  let curYear = new Date().getYear() - 100 + 2000;

  formattedInvoiceItem.createdAt = `${curYear}-${curMonth}-${curDay}`;
  formattedInvoiceItem.id = generateId();
  formattedInvoiceItem.clientEmail = item.billTo.email;
  formattedInvoiceItem.clientName = item.billTo.clientsname;
  formattedInvoiceItem.description = item.description;
  formattedInvoiceItem.items = item.items.map((i) => ({
    ...i,
    name: i.itemname,
  }));
  formattedInvoiceItem.items.forEach((item) => {
    delete item.itemname;
  });
  formattedInvoiceItem.paymentTerms = parseInt(item.paymentTerms);
  formattedInvoiceItem.clientAddress = {
    street: item.billTo.clients_address,
    city: item.billTo.clients_city,
    postcode: item.billTo.clients_postcode,
    country: item.billTo.clients_country,
  };
  formattedInvoiceItem.senderAddress = {
    street: item.billFrom.address,
    city: item.billFrom.city,
    postCode: item.billFrom.postcode,
  };
  formattedInvoiceItem.status = invoiceStatus;
  formattedInvoiceItem.total = item.total;

  formattedInvoiceItem.paymentDue = formatPaymentDue(
    curYear,
    curMonth,
    curDay,
    item.paymentTerms
  );
  console.log("FormattedInvoiceItem", formattedInvoiceItem);
  return formattedInvoiceItem;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const generateId = () => {
  let keys = [];
  for (let i = 0; i < 6; i++) {
    if (Math.random() > 0.65) {
      keys.push((Math.random() * 9) | 0);
    } else {
      keys.push(String.fromCharCode((Math.random() * 25) | (0 + 65)));
    }
  }
  // console.log(keys);
  return keys.join("");
};

const formatPaymentDue = (years, month, days, terms) => {
  let count = terms;
  days = parseInt(days);
  month = parseInt(month);
  years = parseInt(years);

  while (count > 0) {
    count--;
    days++;
    if (days > 31) {
      days = 1;
      month++;
    }
    if (month > 12) {
      month = 1;
      years++;
    }
  }

  return `${years}-${month}-${days}`;
};
