export function Maximize() {
  function handleMaximize() {
    window.api.maximizeApp()
  }
  return (
    <button
      onClick={handleMaximize}
      className="w-3 h-3 bg-green-500 rounded-full hover:brightness-[0.8] duration-300"
    />
  )
}
