export const filterDataType = (data, catType) => {
  return data.filter((category) => {
    return category.type === catType;
  });
};

export const filterDataCategoryType = (data, catType) => {
  return data.filter((category) => {
    return category.categoryType === catType;
  });
};
