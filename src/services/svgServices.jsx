
import React from 'react'
import { svgService } from './svg.service'

export function SvgServices({ name, size = 16, className }) {
  const svgString = svgService.getSvg(name, size)
  if (!svgString) return null

  return <span className={className}  dangerouslySetInnerHTML={{ __html: svgString }} />
}
