// Oversized outlined section number, consistently placed top-right.
export default function SectionNum({ n }) {
  return (
    <span aria-hidden="true" className="mega section-num">
      {n}
    </span>
  )
}
