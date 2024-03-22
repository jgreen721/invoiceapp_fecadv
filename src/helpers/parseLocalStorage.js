export const parseLocalStorage = (name, bill) => {
  let draft = JSON.parse(localStorage.getItem("draftitem")) || null;
  let val = null;
  if (draft == null) return;
  if (bill == "from") {
    for (let i in draft.billFrom) {
      if (name == i) {
        val = draft.billFrom[i];
      }
    }
  } else if (bill == "to") {
    for (let i in draft.billTo) {
      if (name == i) {
        val = draft.billTo[i];
      }
    }
  } else {
    if (name == "description") {
      val = draft.description;
    } else if (name == "day") {
      val = draft.date.day;
    } else if (name == "month") {
      val = draft.date.month;
    } else if (name == "year") {
      val = draft.date.year;
    } else if (name == "paymentTerms") {
      val = draft.paymentTerms;
    } else if (name == "items") {
      // console.log("settingItems", draft.items);
      val = draft.items;
    }
  }

  return val;
};
