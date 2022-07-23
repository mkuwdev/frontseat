export const ParentGrid = ({ children, className = '' }) => {
    return (
        <div
          className={`container mx-auto max-w-screen-xl flex-grow ${className}`}
        >
            <div className="grid grid-cols-[24] lg:gap-8">
              {children}
            </div>
        </div>
      )
}

export const GridEleven = ({ children, className = ''}) => {
  return (
    <div className={`lg:col-span-11 md:col-span-24 ${className}`}>
      {children}
    </div>
  )
}

export const GridSeven = ({ children, className = ''}) => {
  return (
    <div className={`lg:col-span-7 md:col-span-24 mb-5 ${className}`}>
      {children}
    </div>
  )
}

export const GridSix = ({ children, className = ''}) => {
    return (
      <div className={`lg:col-span-6 md:col-span-24 mb-5 ${className}`}>
        {children}
      </div>
    )
  }

