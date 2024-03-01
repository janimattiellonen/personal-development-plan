
export async function getCategories() {

 // const queryString = new URLSearchParams([['selectedCategories', selectedCategoryIds.join(',')]]).toString();

  return fetch(`${import.meta.env.VITE_API_URL}/api/admin/categories`, {
    method: 'get',
    headers: {
      "Content-Type": "application/json",
    },
  })
}
