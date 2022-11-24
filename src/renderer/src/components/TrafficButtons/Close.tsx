export function Close() {
  function handleClose() {
    window.api.closeApp()
  }
  return (
    <button
      id="close-btn"
      onClick={handleClose}
      className="w-3 h-3 bg-red-500 rounded-full hover:brightness-[0.8] duration-300"
    />
  )
}
