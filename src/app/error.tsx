'use client'

export default function error({error}:{error: Error & { digest?: string }}) {
  // console.log(error)
  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center'>
        <div className='w-[80%] bg-red-500 p-4 text-center'>
          <h2>{error.message}</h2>
        </div>
      </div>
    </>
  )
}
