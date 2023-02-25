export async function fetchDocuments() {
  const response = await window.api.fetchDocuments()

  return response.data
}
