

export default function Input({register, type, placeholder, id, errors}) {
  return (
    <>
    <input className="p-1 self-stretch rounded-md border  border-slate-500 focus:outline-none text-sm" type={type} id={id} placeholder={placeholder}
    {...register("lastname",{required:"This field is required"})} aria-invalid={errors[id]?"true":"false"}/>
    {errors[id] && <p className="text-xs text-red-500">This Field is required</p>}
    </>
  )
}
