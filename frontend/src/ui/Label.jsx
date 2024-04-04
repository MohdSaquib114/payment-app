

export default function Label({label, type}) {
  return (
    <label className="text-sm text-slate-600"  htmlFor={type}>{label}</label>
  )
}
