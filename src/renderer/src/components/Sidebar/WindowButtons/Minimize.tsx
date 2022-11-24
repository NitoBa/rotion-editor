export function Minimize() {
  function handleMinimize() {
    window.electron.ipcRenderer.send('minimize-app')
  }
  return (
    <button
      onClick={handleMinimize}
      className="w-3 h-3 bg-yellow-500 rounded-full hover:brightness-[0.8] duration-300"
    />
  )
}
