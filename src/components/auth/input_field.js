import React from "react"

export default function(props) {
  const {input, type, meta} = props
  return (
    <div>
      <input {...input} type={type} className="form-control" />
      {meta.error && meta.touched && <div className="error">{meta.error}</div>}
    </div>
  )
}
