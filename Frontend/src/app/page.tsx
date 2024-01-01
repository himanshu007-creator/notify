
const Card = () => {
  return(
  <div className="float-left mb-4 h-96 w-64 rounded-2xl bg-black">
  </div>
  )
}
export default function Home() {
  return (
    <div className="h-full w-full bg-red-200 font-mono no-scrollbar">
      <div className="flex w-full justify-between bg-pink-300 p-2 px-4 fixed top-0">
        <p className="bg-red-400 p-2">Notify</p>
        <p className="h-10 w-10 rounded-full bg-red-700"></p>
      </div>
      <div className="flex flex-wrap p-4 gap-4 w-full pt-20">
        {
          Array(7).fill(0).map((_, i) => <Card key={i} />)
        }
      </div>
    </div>
  )
}
